/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Colors } from 'res';
import * as Data from 'data';
import FriendsItem from 'components/FriendsItem';
import AddFriendHeader from './AddFriendHeader';

class AddFriendScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  onChangeUsername = (username) => {
    this.setState({ username });
  }

  render() {
    return (
      <View style={styles.background}>
        <AddFriendHeader navigation={this.props.navigation} value={this.state.username} onChange={this.onChangeUsername} />
        <FlatList data={Data.FRIENDS} renderItem={({ item }) => (<FriendsItem user={item} type="add" />)} keyExtractor={(friend) => friend.username} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  searchBarContainer: {
    flex: -1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    marginTop: -1,
  },
});

export default AddFriendScreen;
