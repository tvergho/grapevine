import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import * as Data from 'data';
import ModalHeader from 'components/ModalHeader';
import FriendsItem from 'components/FriendsItem';

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
