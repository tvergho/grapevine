import React from 'react';
import {
  View, StyleSheet, Animated, TouchableOpacity, Dimensions,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

const window = Dimensions.get('window');
const small = window.width <= 350;

const AnimatedHeader = ({ scrollY, rec, navigation }) => {
  // This is the distance the user needs to scroll for the image to disappear completely.
  const HEADER_SCROLL_DISTANCE = hp('40%') - 60;

  // Based on the scroll distance, calculate the corresponding color and other props for each of the header components.
  const background = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
  });
  const text = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: ['rgb(255,255,255)', 'rgb(255,255,255)', 'rgb(0,0,0)'],
    extrapolate: 'clamp',
  });
  const bottomBorder = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
    extrapolate: 'clamp',
  });
  const commissionSize = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [small ? 14 : 16, small ? 14 : 16, 13],
    extrapolate: 'clamp',
  });
  const bizName = scrollY.interpolate({
    inputRange: [0, (HEADER_SCROLL_DISTANCE / 3) * 2, HEADER_SCROLL_DISTANCE],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
    extrapolate: 'clamp',
  });
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  return (
    <Animated.View style={[styles.header, { backgroundColor: background, borderBottomWidth: 1, borderBottomColor: bottomBorder }]}>
      {/* Back button navigation. */}
      <TouchableOpacity
        style={{
          marginTop: 4, flex: -1, flexDirection: 'row', justifyContent: 'center',
        }}
        onPress={() => { navigation.goBack(); }}
        activeOpacity={0.7}
        hitSlop={{
          top: 5, left: 5, right: 5, bottom: 5,
        }}
      >
        <AnimatedIcon name="chevron-left" type="font-awesome" size={16} color={text} />
        <Animated.Text style={[styles.backButtonText, { color: text }]}>{rec.back}</Animated.Text>
      </TouchableOpacity>

      {/* Center business name (only appears on scroll). */}
      <Animated.Text style={[styles.headerBusinessName, { color: bizName }]} numberOfLines={1}>{rec.business.name}</Animated.Text>

      {/* Commission bubble (upper right corner). */}
      <View style={[styles.commissionBubble, { backgroundColor: rec.from_user ? rec.from_user.color : '#B5EAD7' }]}>
        <Animated.Text style={[styles.commissionText, { fontSize: commissionSize }]}>{rec.commission.toString().length > 1 ? rec.commission : `${rec.commission}% back`}</Animated.Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 70,
    width: wp('100%'),
    maxWidth: wp('100%'),
    flexDirection: 'row',
    flex: -1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: hp('4%'),
    position: 'absolute',
    top: 0,
    zIndex: 5,
  },
  headerBusinessName: {
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    paddingTop: 3,
  },
  backButtonText: {
    fontFamily: 'Hiragino W4',
    fontSize: small ? 14 : 16,
    marginLeft: 5,
    marginBottom: 1,
  },
  commissionBubble: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 20,
    marginBottom: 3,
  },
  commissionText: {
    fontFamily: 'Hiragino W7',
    color: '#FFF',
  },
});

export default AnimatedHeader;
