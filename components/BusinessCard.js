/* eslint-disable camelcase */
import React from 'react';
import {
  View, StyleSheet, Image, TouchableOpacity, Text,
} from 'react-native';
import { Colors } from 'res';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextBubble from './TextBubble';

const LoadingCard = ({ full }) => {
  return (
    <View style={[full ? styles.backgroundFull : styles.background, { marginBottom: 30 }]}>
      <SkeletonPlaceholder height={190} paddingLeft={10} paddingRight={10}>
        <SkeletonPlaceholder.Item height={100} width={full ? wp('95%') : wp('100%') - 50} marginTop={10} marginBottom={10} alignSelf="center" borderRadius={10} />
        <SkeletonPlaceholder.Item marginBottom={6} width={180} height={20} borderRadius={10} />
        <SkeletonPlaceholder.Item marginBottom={6} width={250} height={15} borderRadius={10} />
      </SkeletonPlaceholder>
    </View>
  );
};

const BusinessCard = (props) => {
  const {
    index, business, navigation, loading, full, backText,
  } = props;

  if (!loading) {
    const {
      name, street_address, city, commission, dist, photos,
    } = business;

    return (
      <View style={{ backgroundColor: 'black', borderRadius: full ? 0 : 10, marginBottom: full ? 0 : 20 }}>
        <TouchableOpacity activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('Business', {
              ...business, business: { ...business }, back: backText || 'Home', boba: true,
            });
          }}
        >
          <View style={full ? styles.backgroundFull : styles.background}>
            <Image source={{ uri: photos[0] }} style={styles.imageStyle} />

            <View style={{
              flex: -1, flexDirection: 'row', justifyContent: 'space-between',
            }}
            >
              <Text style={styles.nameText}>{`${index + 1}. ${name}`}</Text>
              <TextBubble style={styles.commissionBubble} width={80} backgroundColor={Colors.SECONDARY} textStyle={styles.commissionText} text={`${commission}% back`} borderRadius={12} />
            </View>

            <Text style={styles.addressText}>{`${street_address}, ${city}`}</Text>
            <Text style={styles.distanceText}>{dist === 0 ? '' : `${Math.round(dist * 10) / 10} mi`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <LoadingCard full={full} />
    );
  }
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
  backgroundFull: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
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
    marginTop: 5,
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
