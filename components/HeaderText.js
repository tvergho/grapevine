import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HeaderText = ({ text }) => {
  return (
    <View style={styles.headerButton}>
      <TouchableOpacity><Text style={styles.saveButton}>{text}</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    position: 'absolute',
    right: 20,
    top: hp('6%'),
  },
  saveButton: {
    fontFamily: 'Hiragino W5',
    fontSize: 16,
    color: Colors.PRIMARY,
    backgroundColor: 'transparent',
  },
});

export default HeaderText;
