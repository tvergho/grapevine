/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, FlatList, RefreshControl,
} from 'react-native';
import ModalHeader from 'components/ModalHeader';
import FriendsItem from 'components/FriendsItem';
import { getFriendRequests, getFriends, deleteFriend } from 'actions';
import { connect } from 'react-redux';
import FriendRequestsCard from './FriendRequestsCard';

const FriendsScreen = (props) => {
  const { navigation, route } = props;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (route?.params?.reload || (props?.friends?.friends && props.friends.friends.length === 0)) {
      props.getFriendRequests();
      props.getFriends();
    }
  }, []);

  const { requestsLoading, friendsLoading } = props.friends;
  const loading = requestsLoading || friendsLoading;

  useEffect(() => {
    setRefreshing(false);
  }, [loading]);

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friends" />
      {!loading ? <FriendRequestsCard requests={props.friends.requests} navigation={navigation} /> : <></>}
      <FlatList
        data={loading ? Array.from(Array(5).keys()) : props?.friends?.friends}
        renderItem={({ item }) => (
          <FriendsItem loading={loading} user={item} type="send" swipeable onRemove={props.deleteFriend} />
        )}
        keyExtractor={(friend) => friend.username}
        refreshControl={(
          <RefreshControl refreshing={refreshing}
            onRefresh={() => {
              props.getFriendRequests();
              props.getFriends();
            }}
          />
        )}
      />
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

export default connect(mapStateToProps, { getFriendRequests, getFriends, deleteFriend })(FriendsScreen);
