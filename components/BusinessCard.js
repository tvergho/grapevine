import React, { useState } from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { getDistance } from 'geolib';
import { Colors } from 'res';
import TextBubble from './TextBubble';

const BusinessCard = (props) => {
  const {
    index, business, location, navigation,
  } = props;
  const {
    name, shortAddress, imageURL, commission, address,
  } = business;
  const { latitude, longitude } = location;
  const [locDist, setLocDist] = useState(0);

  const calcDistance = async () => {
    const json = await Geocoder.from(address);
    const latLong = json.results[0].geometry.location;
    const dist = getDistance({ latitude, longitude }, { latitude: latLong.lat, longitude: latLong.lng });
    const miles = dist / 1609.0;
    setLocDist(Math.round(miles * 10) / 10);
  };

  calcDistance();

  return (
    <View style={{ backgroundColor: 'black', borderRadius: 10, marginBottom: 20 }}>
      <TouchableOpacity activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('Business', {
            ...business, business: { ...business }, back: 'Home', boba: true,
          });
        }}
      >
        <View style={styles.background}>
          <Image source={{ uri: imageURL }} style={styles.imageStyle} />

          <View style={{
            flex: -1, flexDirection: 'row', justifyContent: 'space-between',
          }}
          >
            <Text style={styles.nameText}>{`${index + 1}. ${name}`}</Text>
            <TextBubble style={styles.commissionBubble} width={80} backgroundColor={Colors.SECONDARY} textStyle={styles.commissionText} text={commission} borderRadius={12} />
          </View>

          <Text style={styles.addressText}>{shortAddress}</Text>
          <Text style={styles.distanceText}>{locDist === 0 ? '' : `${locDist} mi`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    height: 190,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
    height: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  nameText: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    color: 'black',
  },
  commissionBubble: {
    marginTop: -5,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: 'white',
  },
  addressText: {
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    color: 'black',
  },
  distanceText: {
    fontFamily: 'Hiragino W4',
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
});

export default BusinessCard;
