import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import * as Data from '../data';
import ModalHeader from './modal-header';
import FriendsItem from './friends-item';

const FriendRequests = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friend Requests" />
      <FlatList data={Data.FRIEND_REQUESTS} renderItem={({ item }) => (<FriendsItem user={item} type="request" />)} keyExtractor={(friend) => friend.username} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

export default FriendRequests;
