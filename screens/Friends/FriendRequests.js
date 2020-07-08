/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ModalHeader from 'components/ModalHeader';
import FriendsItem from 'components/FriendsItem';
import { connect } from 'react-redux';
import { getFriends, getFriendRequests } from 'actions';

const FriendRequests = (props) => {
  const { navigation } = props;
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (shouldRefresh) {
      return () => {
        props.getFriends();
        props.getFriendRequests();
      };
    }
  });

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friend Requests" />
      <FlatList data={props.friends.requests} renderItem={({ item }) => (<FriendsItem user={item} type="request" shouldRefresh={setShouldRefresh} />)} keyExtractor={(friend) => friend.UserID} />
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

export default connect(mapStateToProps, { getFriends, getFriendRequests })(FriendRequests);
