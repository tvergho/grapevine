/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Colors } from 'res';
import FriendsItem from 'components/FriendsItem';
import { connect } from 'react-redux';
import {
  usernameSearch, phoneSearch, clearUsernameSearch, getFriends, getFriendRequests, fbFriendsSearch,
} from 'actions';
import AddFriendHeader from './AddFriendHeader';

class AddFriendScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    this.props.fbFriendsSearch();
  }

  componentWillUnmount() {
    this.props.clearUsernameSearch();
  }

  onChangeUsername = (username) => {
    this.setState({ username });
    this.search(username);
  }

  search = (searchTerm) => {
    if (searchTerm.length > 0) {
      if (searchTerm.match(/^[A-Za-z]+$/) || searchTerm.length < 10) {
        this.props.usernameSearch(searchTerm);
      } else {
        this.props.phoneSearch(searchTerm);
      }
    } else {
      this.props.clearUsernameSearch();
    }
  }

  reloadFriendCache = () => {
    setTimeout(() => {
      this.props.getFriends();
      this.props.getFriendRequests();
    }, 1000);
  }

  render() {
    const { username, fbFriends, loading } = this.props.search;
    return (
      <View style={styles.background}>
        <AddFriendHeader navigation={this.props.navigation} value={this.state.username} onChange={this.onChangeUsername} loading={loading} />
        <FlatList
          data={this.state.username.length > 0 ? username.searchResults : fbFriends.searchResults}
          renderItem={({ item }) => (
            <FriendsItem user={item}
              type="add"
              shouldRefresh={this.reloadFriendCache}
            />
          )}
          keyExtractor={(friend) => friend.username}
          keyboardShouldPersistTaps="always"
        />
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

const mapStateToProps = (reduxState) => (
  {
    search: reduxState.search,
  }
);

export default connect(mapStateToProps, {
  usernameSearch, phoneSearch, clearUsernameSearch, getFriendRequests, getFriends, fbFriendsSearch,
})(AddFriendScreen);
