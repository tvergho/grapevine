/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from 'components/ReanimatedBottomSheet_patched';
import * as Data from 'data';
import { businessLocationSearch, businessLocationScroll, setCanLoad } from 'actions';
import Constants from 'expo-constants';
import RecSection from './RecSection';
import MapSection from './MapSection';
import BusinessSection from './BusinessSection';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: { // Default location set to Bell.
        latitude: 37.343566,
        longitude: -121.918752,
        latitudeDelta: 0.12,
        longitudeDelta: 0.15,
      },
      curLoc: {
        latitude: 37.343566,
        longitude: -121.918752,
      },
      locations: [],
      scroll: false,
      searchResults: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    // Checks to see whether permission's been granted and requests permission if necessary.
    // Immediately jumps to loading on the simulator.
    if (Constants.isDevice) {
      Location.getPermissionsAsync()
        .then((response) => {
          if (!response.granted) {
            this.requestPermission();
          } else {
            this.detectLocation();
          }
        });
    } else {
      this.props.businessLocationSearch(this.state.curLoc.latitude, this.state.curLoc.longitude);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.search.businessLoc.searchResults !== prevProps.search.businessLoc.searchResults) {
        this.setState({
          searchResults: this.props.search.businessLoc.searchResults,
        }, () => { setTimeout(() => { this.props.setCanLoad(true); }, 500); });
      }
    }
  }

  requestPermission = () => {
    Location.requestPermissionsAsync()
      .then((response) => {
        if (response.granted) {
          this.detectLocation();
        }
      });
  }

  onRegionChange = (region) => {
    this.setState({ location: region });
  }

  detectLocation = () => {
    // Updates the latitude and longitude of the current map region in state.
    Location.getCurrentPositionAsync()
      .then((location) => {
        const newLoc = { ...this.state.location };
        newLoc.latitude = location.coords.latitude;
        newLoc.longitude = location.coords.longitude;
        this.setState(() => { return ({ location: newLoc, curLoc: newLoc }); });
        this.props.businessLocationSearch(location.coords.latitude, location.coords.longitude);
      })
      .catch((error) => {
        console.log(error);
        this.props.businessLocationSearch(this.state.curLoc.latitude, this.state.curLoc.longitude);
      });
  }

  bottomSheetContent = () => {
    return (
      <ScrollView
        style={{
          backgroundColor: 'white',
        }}
        ref={(ref) => { this.scrollView = ref; }}
        scrollEnabled={this.state.scroll}
        scrollEventThrottle={32}
        onScroll={(e) => {
          let paddingToBottom = 15;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            this.scroll();
          }
        }}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refresh} />}
      >
        <RecSection navigation={this.props.navigation} openFeed={this.openFeed} recs={Data.RECOMMENDATIONS} />
        <BusinessSection navigation={this.props.navigation} searchResults={this.state.searchResults} loading={this.props.search.loading} refresh={this.refresh} />
      </ScrollView>
    );
  }

  openFeed = () => {
    this.props.navigation.jumpTo('Feed');
  }

  scroll = () => {
    this.props.businessLocationScroll(this.state.curLoc.latitude, this.state.curLoc.longitude, this.props.search.businessLoc.scrollId);
  }

  refresh = () => {
    this.setState({ refresh: true });
    this.props.businessLocationSearch(this.state.curLoc.latitude, this.state.curLoc.longitude);
  }

  header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTab} />
      </View>
    );
  }

  onOpen = () => {
    this.setState({ scroll: true });
  }

  onClose = () => {
    this.setState({ scroll: false });
    this.scrollView.scrollTo({ y: 0, animated: false });
  }

  render() {
    return (
      <View style={styles.background}>
        <MapSection
          location={this.state.location}
          markers={this.state.searchResults}
          balance={this.props.balance}
          onRegionChange={this.onRegionChange}
          navigation={this.props.navigation}
        />
        <BottomSheet
          snapPoints={[hp('80%'), hp('50%'), hp('20%')]}
          renderHeader={this.header}
          renderContent={this.bottomSheetContent}
          initialSnap={1}
          enabledGestureInteraction
          overdragResistanceFactor={10}
          onOpenEnd={this.onOpen}
          onCloseStart={this.onClose}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerContainer: {
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerTab: {
    backgroundColor: '#D8D8D8',
    height: 4,
    width: 35,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
});

const mapStateToProps = (reduxState) => (
  {
    balance: reduxState.user.balance,
    search: reduxState.search,
  }
);

export default connect(mapStateToProps, { businessLocationScroll, businessLocationSearch, setCanLoad })(HomeScreen);
