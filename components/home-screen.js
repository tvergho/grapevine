/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import * as Data from '../data';

const RecCard = (props) => {
  const { commission, business, id } = props.rec;
  const user = props.rec.fromUser;
  const width = 250;
  const height = 130;

  return (
    <View style={[recCardStyles.container, { width, height }]} key={id}>
      <TouchableOpacity activeOpacity={0.5}>
        <Image source={{ uri: business.imageURL }}
          style={{
            width, height, borderRadius: 15, opacity: 0.8,
          }}
        />
        <View style={[recCardStyles.commissionBubble, { backgroundColor: user.color }]}>
          <Text style={recCardStyles.commissionText}>{commission}</Text>
        </View>
        <Text style={recCardStyles.bizName}>
          {business.name}
        </Text>

        <View style={{
          flex: -1,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          left: 10,
        }}
        >
          <Text style={recCardStyles.from}>from</Text>
          <View style={recCardStyles.fromBubble}>
            <Text style={[recCardStyles.fromName, { color: user.color }]}>{user.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const recCardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 15,
    marginRight: 20,
  },
  bizName: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: '#FFF',
    position: 'absolute',
    bottom: 30,
    left: 10,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  from: {
    fontFamily: 'Hiragino W3',
    fontSize: 12,
    color: '#FFF',
    paddingTop: 2,
  },
  commissionBubble: {
    position: 'absolute',
    right: 10,
    top: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 10,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: '#FFF',
  },
  fromBubble: {
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  fromName: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: 37.343566,
        longitude: -121.918752,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    Location.getPermissionsAsync()
      .then((response) => {
        if (!response.granted) {
          this.requestPermission();
        } else {
          this.detectLocation();
        }
      });
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
    Location.getCurrentPositionAsync()
      .then((location) => {
        const newLoc = { ...this.state.location };
        newLoc.latitude = location.coords.latitude;
        newLoc.longitude = location.coords.longitude;
        this.setState(() => { return ({ location: newLoc }); });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  recSection() {
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
          {Data.RECOMMENDATIONS.map((rec) => {
            return (
              <RecCard rec={rec} key={rec.id} />
            );
          })}
        </ScrollView>
      </View>
    );
  }

  bizSection() {
    return (
      <View style={styles.section} key="biz-section">
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Business Discounts</Text>
          <Button type="clear" titleStyle={styles.sectionButton} title="See all" />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <MapView region={this.state.location} onRegionChangeComplete={this.onRegionChange} style={styles.mapStyle} />

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

        {this.recSection()}
        {this.bizSection()}
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
    width: Dimensions.get('window').width,
    height: 300,
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
    top: 30,
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
    top: 30,
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
