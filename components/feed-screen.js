/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, ScrollView, TextInput,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as Data from '../data';
import RecCard from './rec-card';

class FeedScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'Friends',
      search: '',
    };
  }

  onYouClick = () => {
    this.setState({ active: 'You' });
  }

  onFriendsClick = () => {
    this.setState({ active: 'Friends' });
  }

  onSearchChange = (text) => {
    this.setState({ search: text });
  }

  topSection = () => {
    return (
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Feed</Text>

        <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
          <Button type="clear" titleStyle={this.state.active === 'You' ? styles.activeLink : styles.inactiveLink} title="You" onPress={this.onYouClick} />
          <Button type="clear" titleStyle={this.state.active === 'Friends' ? styles.activeLink : styles.inactiveLink} title="Friends" onPress={this.onFriendsClick} />
        </View>

        <TouchableOpacity style={styles.headerButton}>
          <FontAwesomeIcon icon={faPencilAlt} size={20} color="rgb(255,255,255)" />
        </TouchableOpacity>
      </View>
    );
  }

  searchFilter = (rec) => {
    let { search } = this.state;
    search = search.trim().toLowerCase();
    if (search.length <= 0) return true;

    let isIncluded = false;
    const {
      business, fromUser, message,
    } = rec;
    const bizName = business ? business.name.trim().toLowerCase() : '';
    const userName = fromUser ? fromUser.name.trim().toLowerCase() : '';
    const recMessage = message ? message.trim().toLowerCase() : '';

    if (bizName.includes(search) || userName.includes(search) || recMessage.includes(search)) isIncluded = true;

    return isIncluded;
  }

  friendsFeed = () => {
    return (
      <>
        <View style={{ flex: -1, flexDirection: 'row' }}>
          <FontAwesomeIcon icon={faSearch} size={20} color="rgba(0,0,0,0.7)" />
          <TextInput style={styles.searchBar} placeholder="Search businesses..." placeholderTextColor="#D8D8D8" value={this.state.search} onChangeText={this.onSearchChange} />
        </View>

        <ScrollView
          decelerationRate="fast"
          scrollEventThrottle={200}
          showsVerticalScrollIndicator={false}
          style={this.state.active === 'Friends' ? '' : { display: 'none' }} // Uses 'display' so that the component stays mounted and doesn't reload images.
        >
          {Data.RECOMMENDATIONS.filter(this.searchFilter).sort((a, b) => (b.timestamp - a.timestamp)).map((rec) => { // Sorts by timestamp in descending order.
            return (
              <RecCard rec={rec} key={rec.id} feed navigation={this.props.navigation} />
            );
          })}
        </ScrollView>
      </>
    );
  }

  youFeed = () => {
    return (
      <View style={this.state.active === 'You' ? '' : { display: 'none' }} />
    );
  }

  render() {
    return (
      <View style={styles.background}>
        {this.topSection()}
        {this.friendsFeed()}
        {this.youFeed()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
  },
  topSection: {
    marginTop: hp('5%'),
    minHeight: 60,
    height: 60,
    paddingLeft: 15,
    paddingRight: 15,
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerText: {
    color: 'black',
    fontFamily: 'Hiragino W7',
    fontSize: 24,
  },
  inactiveLink: {
    fontFamily: 'Hiragino W4',
    color: '#6D7278',
    fontSize: 14,
  },
  activeLink: {
    fontFamily: 'Hiragino W7',
    color: '#FFB7B2',
    fontSize: 14,
  },
  headerButton: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2,
    backgroundColor: '#FFB7B2',
    borderRadius: 100,
    width: 45,
    height: 45,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  searchBar: {
    width: wp('85%'),
    height: 40,
    marginBottom: 20,
    marginTop: -10,
    paddingLeft: 10,
  },
});

export default FeedScreen;
