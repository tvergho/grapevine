/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import ModalHeader from 'components/ModalHeader';
import * as Data from 'data';
import FriendsItem from './FriendsItem';
import FriendRequestsCard from './FriendRequestsCard';

const FriendsScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friends" />
      <FriendRequestsCard requests={Data.FRIEND_REQUESTS} navigation={navigation} />
      <FlatList data={Data.FRIENDS} renderItem={({ item }) => (<FriendsItem user={item} type="send" />)} keyExtractor={(friend) => friend.username} />
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
