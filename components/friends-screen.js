import React from 'react';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import ModalHeader from './modal-header';
import FriendsItem from './friends-item';
import * as Data from '../data';

const FriendsScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friends" />

      <FlatList data={Data.FRIENDS} renderItem={({ item }) => (<FriendsItem user={item} type="send" />)} />
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
