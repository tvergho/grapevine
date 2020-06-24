import React from 'react';
import {
  View, StyleSheet, Dimensions, Image, Text,
} from 'react-native';
import { Colors, Images } from 'res';

const window = Dimensions.get('window');
const small = window.width <= 350;

const LogoHeader = (props) => {
  return (
    <View style={styles.background}>
      <Image source={Images.recroomLogo} style={styles.imageLogo} />
      <View style={styles.appTextContainer}>
        <Text key="rec" style={styles.appText}>rec</Text>
        <Text key="room" style={styles.appText}>room</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 100,
    marginTop: 10,
  },
  imageLogo: {
    width: small ? 65 : 85,
    height: small ? 65 : 85,
    marginRight: 20,
  },
  appTextContainer: {
    paddingTop: 10,
  },
  appText: {
    fontFamily: 'Hiragino W7',
    fontSize: small ? 40 : 48,
    color: Colors.WHITE,
    marginTop: -20,
  },
});

export default LogoHeader;
