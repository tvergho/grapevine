/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet from 'components/ReanimatedBottomSheet_patched';
import {
  businessLocationSearch, businessLocationScroll, setCanLoad, getRecs,
} from 'actions';
import Constants from 'expo-constants';
import { withLocation, DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from 'utils/withLocation';
import RecSection from './RecSection';
import MapSection from './MapSection';
import BusinessSection from './BusinessSection';

const floatsAreEqual = (n1, n2) => {
  const precision = 0.001;

  if (Math.abs(n1 - n2) <= precision) {
    return true;
  }
  return false;
};

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
      locations: [],
      scroll: false,
      searchResults: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    // Immediately jumps to loading on the simulator.
    if (!Constants.isDevice) {
      this.props.businessLocationSearch(this.props.location.latitude, this.props.location.longitude);
    }

    this.setLocation(this.props.location);
    this.props.getRecs();
  }

  componentDidUpdate(prevProps) {
    if (this.props.search.businessLoc.searchResults !== prevProps.search.businessLoc.searchResults) {
      this.setState({
        searchResults: this.props.search.businessLoc.searchResults,
      }, () => { setTimeout(() => { this.props.setCanLoad(true); }, 500); });
    }

    if (this.props.location !== prevProps.location) {
      this.setLocation(this.props.location);
      const { latitude, longitude } = this.props.location;
      this.props.businessLocationSearch(latitude, longitude);
    }
  }

  setLocation = ({ latitude, longitude }) => {
    const newLoc = { ...this.state.location };
    newLoc.latitude = latitude;
    newLoc.longitude = longitude;
    this.setState(() => { return ({ location: newLoc }); });
  }

  onRegionChange = (region) => {
    // Prevent bug from onRegionChangeComplete callback.
    if (!floatsAreEqual(region.latitude, DEFAULT_LATITUDE) && !floatsAreEqual(region.longitude, DEFAULT_LONGITUDE)) {
      this.setState({ location: region });
    }
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
        <RecSection
          navigation={this.props.navigation}
          openFeed={this.openFeed}
          recs={this.props.rec.recs}
          loading={this.props.rec.loading}
        />
        <BusinessSection
          navigation={this.props.navigation}
          searchResults={this.state.searchResults}
          loading={this.props.search.loading}
          refresh={this.refresh}
          location={this.props.location}
        />
      </ScrollView>
    );
  }

  openFeed = () => {
    this.props.navigation.jumpTo('Feed');
  }

  scroll = () => {
    this.props.businessLocationScroll(this.props.location.latitude, this.props.location.longitude, this.props.search.businessLoc.scrollId);
  }

  refresh = () => {
    this.setState({ refresh: true });
    this.props.businessLocationSearch(this.props.location.latitude, this.props.location.longitude);
    this.props.getRecs();
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
    rec: reduxState.rec,
  }
);

export default withLocation(connect(mapStateToProps, {
  businessLocationScroll, businessLocationSearch, setCanLoad, getRecs,
})(HomeScreen));
