import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import { Colors } from 'res';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SlidePane from './SlidePane';
import SettingsItem from './SettingsItem';

const SettingsPane = ({ isVisible, close, navigation }) => {
  const open = (screen) => {
    close();
    navigation.navigate(screen);
  };
  return (
    <SlidePane isVisible={isVisible} close={close}>
      <Text style={styles.titleText}>Settings</Text>

      <SettingsItem text="Edit profile" icon={faUser} open={() => { open('EditProfile'); }} />
    </SlidePane>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: Colors.BLACK,
    fontFamily: 'Hiragino W7',
    fontSize: 24,
    paddingBottom: 3,
    marginBottom: 40,
  },
});

export default SettingsPane;
