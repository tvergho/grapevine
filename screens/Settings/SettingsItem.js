import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { Colors } from 'res';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const SettingsItem = ({ text, icon, open }) => {
  return (
    <TouchableOpacity style={styles.background} onPress={open}>
      <FontAwesomeIcon icon={icon} size={20} color="black" style={{ marginRight: 15 }} />
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: 'rgba(0,0,0,0.8)',
    fontFamily: 'Hiragino W5',
    fontSize: 14,
    paddingBottom: 5,
    paddingTop: 7,
  },
});

export default SettingsItem;
