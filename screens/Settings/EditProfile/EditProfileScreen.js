import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'res';
import ModalHeader from 'components/ModalHeader';

const EditProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Edit profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
});

export default EditProfileScreen;
