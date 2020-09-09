import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import { Colors } from 'res';
import SlidePane from './SlidePane';

const SettingsPane = ({ isVisible, close }) => {
  return (
    <SlidePane isVisible={isVisible} close={close}>
      <Text style={styles.titleText}>Settings</Text>
    </SlidePane>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: Colors.BLACK,
    fontFamily: 'Hiragino W7',
    fontSize: 24,
    paddingBottom: 3,
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 20,
  },
});

export default SettingsPane;
