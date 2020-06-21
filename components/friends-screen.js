import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModalHeader from './modal-header';

const FriendsScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friends" />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default FriendsScreen;
