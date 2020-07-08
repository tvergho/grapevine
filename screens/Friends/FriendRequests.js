/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ModalHeader from 'components/ModalHeader';
import FriendsItem from 'components/FriendsItem';
import { connect } from 'react-redux';

const FriendRequests = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friend Requests" />
      <FlatList data={props.friends.requests} renderItem={({ item }) => (<FriendsItem user={item} type="request" />)} keyExtractor={(friend) => friend.UserID} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

const mapStateToProps = (reduxState) => (
  {
    friends: reduxState.friends,
  }
);

export default connect(mapStateToProps, null)(FriendRequests);
