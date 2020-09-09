import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UIActivityIndicator } from 'react-native-indicators';

const HeaderText = ({ text, loading, onPress }) => {
  return (
    <View style={styles.headerButton}>
      {loading && <UIActivityIndicator color="rgba(0,0,0,0.7)" size={16} style={{ marginRight: 10 }} />}

      <TouchableOpacity disabled={loading} onPress={onPress} style={{ opacity: loading ? 0.5 : 1 }}><Text style={styles.saveButton}>{text}</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    position: 'absolute',
    right: 20,
    top: hp('6%'),
    flex: -1,
    flexDirection: 'row',
  },
  saveButton: {
    fontFamily: 'Hiragino W5',
    fontSize: 16,
    color: Colors.PRIMARY,
    backgroundColor: 'transparent',
  },
});

export default HeaderText;
