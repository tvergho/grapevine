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
        <Text key="boba" style={styles.appText}>boba</Text>
        <Text key="me" style={styles.appText}>me</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 100,
    marginTop: 10,
    marginBottom: 20,
  },
  imageLogo: {
    width: small ? 75 : 95,
    height: small ? 75 : 95,
    marginRight: 20,
  },
  appTextContainer: {
    paddingTop: 40,
  },
  appText: {
    fontFamily: 'Hiragino W7',
    fontSize: small ? 38 : 45,
    color: Colors.WHITE,
    marginTop: -20,
  },
});

export default LogoHeader;
