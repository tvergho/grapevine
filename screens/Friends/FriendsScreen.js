/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import ModalHeader from 'components/ModalHeader';
import FriendsItem from 'components/FriendsItem';
import { getFriendRequests, getFriends, deleteFriend } from 'actions';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable-row';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import FriendRequestsCard from './FriendRequestsCard';

const FriendsScreen = (props) => {
  const { navigation } = props;

  useEffect(() => {
    props.getFriendRequests();
    props.getFriends();
  }, []);

  const { requestsLoading, friendsLoading } = props.friends;
  const loading = requestsLoading || friendsLoading;

  const leftContent = (
    <View style={{
      backgroundColor: '#EB6660', flex: 1, alignItems: 'flex-end', justifyContent: 'center',
    }}
    >
      <FontAwesomeIcon icon={faUserTimes} size={40} color="white" style={{ marginRight: 15 }} />
    </View>
  );

  return (
    <View style={styles.background}>
      <ModalHeader navigation={navigation} title="Friends" />
      {!loading ? <FriendRequestsCard requests={props.friends.requests} navigation={navigation} /> : <></>}
      <FlatList
        data={loading ? Array.from(Array(5).keys()) : props.friends.friends}
        renderItem={({ item }) => (
          <Swipeable leftContent={leftContent} onLeftActionRelease={() => { props.deleteFriend(item.UserID); }}>
            <FriendsItem loading={loading} user={item} type="send" />
          </Swipeable>
        )}
        keyExtractor={(friend) => friend.username}
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
