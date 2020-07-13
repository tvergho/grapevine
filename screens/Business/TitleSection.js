import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { Colors, Images } from 'res';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TitleSection = ({ business, rec }) => {
  return (
    <View style={styles.background}>
      <View style={{ flex: -1, flexDirection: 'row' }}>
        <Text style={styles.businessName} numberOfLines={1}>{rec.business.name}</Text>
        {/* rec.personal ? <Image source={Images.personal} style={{ width: 25, height: 25, marginLeft: 3 }} /> : <></> */}
      </View>

      <Text style={styles.businessCategory} numberOfLines={1}>{business && business.category ? business.category : 'Boba'}</Text>

      <View>
        <Image source={Images.like} style={styles.likeImage} />
        <Text style={styles.likeText}>{rec.likes ? rec.likes : business.likes || ''}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: -50,
    left: 15,
    width: wp('100%'),
  },
  businessName: {
    fontFamily: 'Hiragino W7',
    fontSize: 18,
    color: Colors.WHITE,
  },
  businessCategory: {
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    color: Colors.WHITE,
  },
  likeText: {
    fontFamily: 'Hiragino W7',
    fontSize: 12,
    color: Colors.WHITE,
    position: 'absolute',
    bottom: 0,
    right: 22,
  },
  likeImage: {
    width: 17,
    height: 15,
    position: 'absolute',
    bottom: 5,
    right: 35,

  },
});

export default TitleSection;
