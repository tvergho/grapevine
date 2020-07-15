import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MainHeader = ({ children, title, border }) => {
  return (
    <View style={[styles.topSection, border ? { borderBottomColor: 'rgba(235, 102, 96, 0.3)', borderBottomWidth: 1 } : {}]}>
      <Text style={styles.headerText}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    marginTop: hp('5%'),
    minHeight: 60,
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    color: Colors.BLACK,
    fontFamily: 'Hiragino W7',
    fontSize: 24,
    paddingBottom: 3,
  },
});

export default MainHeader;
