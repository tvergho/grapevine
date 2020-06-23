/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, FlatList,
} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Geocoder from 'react-native-geocoding';
import BottomSheet from './ReanimatedBottomSheet_patched';
import * as Data from '../data';
import RecCard from './rec-card';
import BusinessCard from './business-card';

const window = Dimensions.get('window');
const small = window.width <= 350;

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
    console.log(locations);
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

  openFeed = () => {
    this.props.navigation.jumpTo('Feed');
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
        scrollEnabled={this.state.scroll}
      >
        {this.recSection()}
        {this.bizSection()}
      </ScrollView>
    );
  }

  header = () => {
    return (
      <View style={{
        flex: -1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',
      }}
      >
        <View style={{
          backgroundColor: '#D8D8D8', height: 4, width: 35, borderRadius: 4, marginTop: 10, marginBottom: -10,
        }}
        />
      </View>
    );
  }

  recSection = () => {
    return (
      <View style={styles.section} key="rec-section">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended to you</Text>
          <Button type="clear" titleStyle={styles.sectionButton} title="See all" onPress={this.openFeed} />
        </View>
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
      </View>
    );
  }

  bizSection = () => {
    return (
      <View style={styles.section} key="biz-section">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Boba Discounts</Text>
          <Button type="clear" titleStyle={styles.sectionButton} title="See all" />
        </View>

        <FlatList data={Data.BOBA_BUSINESSES}
          renderItem={({ item, index }) => (<BusinessCard business={item} index={index} location={this.state.curLoc} navigation={this.props.navigation} />)}
          keyExtractor={(biz) => biz.name}
          scrollEnabled={false}
          style={{ marginBottom: 30 }}
        />
      </View>
    );
  }

  mapSection = () => {
    return (
      <>
        <MapView region={this.state.location} onRegionChangeComplete={this.onRegionChange} style={styles.mapStyle}>
          {this.state.locations.map((coord, index) => {
            return (
              <Marker coordinate={coord}>
                <FontAwesomeIcon icon={faMapMarker} size={40} color="#FFB7B2" />
                <Text style={{
                  fontFamily: 'Hiragino W7', color: 'white', fontSize: 16, position: 'absolute', left: 14, top: 8,
                }}
                >
                  {`${index + 1}`}
                </Text>
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.addFriendContainer} key="add-friend">
          <TouchableOpacity style={styles.addFriendBubble} activeOpacity={0.6}>
            <Text style={[styles.addFriendText, { fontSize: 24, marginRight: 6, paddingTop: 2 }]}>+</Text>
            <Text style={styles.addFriendText}>Add Friend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.moneyContainer} key="money">
          <TouchableOpacity style={styles.moneyBubble} activeOpacity={0.6}>
            <NumberFormat value={this.props.balance} displayType="text" thousandSeparator prefix="$" renderText={(value) => <Text style={styles.moneyText}>{value}</Text>} />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  onOpen = () => {
    console.log('open');
    this.setState({ scroll: true });
  }

  onClose = () => {
    console.log('close');
    this.setState({ scroll: false });
  }

  render() {
    return (
      <View style={styles.background}>
        {this.mapSection()}
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
  mapStyle: {
    width: window.width,
    height: hp('100%'),
  },
  section: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  sectionHeader: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Hiragino W7',
    fontSize: 18,
    color: '#000000',
  },
  sectionButton: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: '#FFB7B2',
  },
  addFriendContainer: {
    backgroundColor: '#000000',
    position: 'absolute',
    left: 10,
    top: small ? 30 : 40,
    width: 150,
    height: 35,
    borderRadius: 25,
  },
  addFriendBubble: {
    backgroundColor: '#fff',
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2,
    flexDirection: 'row',
    borderColor: '#FFB7B2',
    borderWidth: 1,
  },
  addFriendText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: '#FFB7B2',
    paddingTop: 5,
  },
  moneyContainer: {
    backgroundColor: '#000000',
    position: 'absolute',
    right: 10,
    top: small ? 30 : 40,
    width: 90,
    height: 35,
    borderRadius: 25,
  },
  moneyBubble: {
    backgroundColor: '#FFB7B2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2,
  },
  moneyText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: '#FFFFFF',
    paddingTop: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    balance: reduxState.user.balance,
  }
);

export default connect(mapStateToProps, null)(HomeScreen);
