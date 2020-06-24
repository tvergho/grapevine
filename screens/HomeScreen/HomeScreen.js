/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Geocoder from 'react-native-geocoding';
import BottomSheet from 'components/ReanimatedBottomSheet_patched';
import * as Data from 'data';
import RecCard from 'components/RecCard';
import BusinessCard from 'components/BusinessCard';
import MapSection from './MapSection';
import HomeSection from './HomeSection';

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
    };
  }

  componentDidMount() {
    // Checks to see whether permission's been granted and requests permission if necessary.
    Location.getPermissionsAsync()
      .then((response) => {
        if (!response.granted) {
          this.requestPermission();
        } else {
          this.detectLocation();
        }
      });

    this.getAddresses();
  }

  getAddresses = async () => {
    let locations = [];
    for (let i = 0; i < Data.BOBA_BUSINESSES.length; i += 1) {
      const json = await Geocoder.from(Data.BOBA_BUSINESSES[i].address);
      const latLong = json.results[0].geometry.location;
      const loc = { latitude: latLong.lat, longitude: latLong.lng };
      locations = locations.concat([loc]);
    }
    this.setState({ locations });
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
      })
      .catch((error) => {
        console.log(error);
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
      >
        {this.recSection()}
        {this.bizSection()}
      </ScrollView>
    );
  }

  openFeed = () => {
    this.props.navigation.jumpTo('Feed');
  }

  header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTab} />
      </View>
    );
  }

  recSection = () => {
    return (
      <HomeSection onPress={this.openFeed} title="Recommended to you">
        <ScrollView
          horizontal
          decelerationRate="fast"
          scrollEventThrottle={200}
        >
          {Data.RECOMMENDATIONS.sort((a, b) => (b.timestamp - a.timestamp)).slice(0, 3).map((rec) => { // Limits to the three most recent recs.
            return (
              <RecCard rec={rec} key={rec.id} navigation={this.props.navigation} />
            );
          })}
        </ScrollView>
      </HomeSection>
    );
  }

  bizSection = () => {
    return (
      <HomeSection title="Boba Discounts">
        <FlatList data={Data.BOBA_BUSINESSES}
          renderItem={({ item, index }) => (<BusinessCard business={item} index={index} location={this.state.curLoc} navigation={this.props.navigation} />)}
          keyExtractor={(biz) => biz.name}
          scrollEnabled={false}
          style={{ marginBottom: 30 }}
        />
      </HomeSection>
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
        <MapSection location={this.state.location} markers={this.state.locations} balance={this.props.balance} onRegionChange={this.onRegionChange} />
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
  }
);

export default connect(mapStateToProps, null)(HomeScreen);
