/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text, Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Data from '../data';

const window = Dimensions.get('window');
const small = window.width <= 350;

class Business extends Component {
  constructor(props) {
    super(props);
  }

  // This will become a Redux action once the backend's set up.
  getBusinessById = (id) => {
    return Data.BUSINESSES[id];
  }

  imageSection = () => {
    // Basic rec information will be passed from the previous screen for speedy loading.
    const rec = this.props.route.params;
    const business = this.getBusinessById(rec.business.id);

    return (
      <>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>

          {/* Background image section - everything here is absolutely positioned to the height of the image. */}
          <Image source={{ uri: business.imageURL }}
            style={{ height: hp('40%'), opacity: 0.7 }}
          />

          <View style={{
            position: 'absolute',
            bottom: 30,
            left: 15,
            flex: -1,
            flexDirection: 'row',
          }}
          >
            <Text style={styles.businessName} numberOfLines={1}>{business.name}</Text>
            {rec.personal ? <Image source={require('../assets/personal.png')} style={{ width: 25, height: 25, marginLeft: 3 }} /> : <></>}
          </View>

          <Text style={styles.businessCategory} numberOfLines={1}>{business.category.join(', ')}</Text>
        </View>

        {/* Back button navigation. */}
        <View style={{
          position: 'absolute',
          top: small ? 30 : 40,
          left: 15,
        }}
        >
          <TouchableOpacity style={{ flex: -1, flexDirection: 'row', justifyContent: 'center' }} onPress={() => { this.props.navigation.goBack(); }} activeOpacity={0.7}>
            <FontAwesomeIcon icon={faChevronLeft} size={16} color="rgb(255,255,255)" />
            <Text style={styles.backButtonText}>{rec.back}</Text>
          </TouchableOpacity>
        </View>

        {/* Commission bubble (upper right corner). */}
        <View style={[styles.commissionBubble, { backgroundColor: rec.fromUser.color }]}>
          <Text style={styles.commissionText}>{rec.commission}</Text>
        </View>

        {/* Like section (bottom right). */}
        <View>
          <Image source={require('../assets/like.png')}
            style={{
              width: 17, height: 15, position: 'absolute', bottom: 15, right: 30,
            }}
          />
          <Text style={styles.likeText}>{rec.likes}</Text>
        </View>
      </>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        {this.imageSection()}
      </View>
    );
  }
}

export default Business;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  backButtonText: {
    fontFamily: 'Hiragino W4',
    color: 'white',
    fontSize: 16,
    marginLeft: 3,
  },
  commissionBubble: {
    position: 'absolute',
    right: 15,
    top: small ? 23 : 33,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    borderRadius: 20,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    fontSize: 16,
    color: '#FFF',
  },
  businessName: {
    fontFamily: 'Hiragino W7',
    fontSize: 18,
    color: '#FFF',
  },
  businessCategory: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: '#FFF',
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  likeText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    bottom: 10,
    right: 17,
  },
});
