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
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import * as Data from '../data';
import RecCard from './rec-card';
import EarningsItem from './earnings-item';

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

  createRec = () => {
    this.props.navigation.navigate('CreateRec');
  }

  topSection = () => {
    return (
      <View style={styles.topSection}>
        <Text style={styles.headerText}>Feed</Text>

        <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
          <Button type="clear" titleStyle={this.state.active === 'You' ? styles.activeLink : styles.inactiveLink} title="You" onPress={this.onYouClick} />
          <Button type="clear" titleStyle={this.state.active === 'Friends' ? styles.activeLink : styles.inactiveLink} title="Friends" onPress={this.onFriendsClick} />
        </View>

        <TouchableOpacity style={styles.headerButton} onPress={this.createRec}>
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
      <View style={this.state.active === 'Friends' ? '' : { display: 'none' }}>
        <View style={{ flex: -1, flexDirection: 'row' }}>
          <FontAwesomeIcon icon={faSearch} size={20} color="rgba(0,0,0,0.7)" />
          <TextInput style={styles.searchBar} placeholder="Search businesses..." placeholderTextColor="#D8D8D8" value={this.state.search} onChangeText={this.onSearchChange} clearButtonMode="always" />
        </View>

        <ScrollView
          decelerationRate="fast"
          scrollEventThrottle={200}
          showsVerticalScrollIndicator={false}
          style={this.state.active === 'Friends' ? '' : { display: 'none' }} // Uses 'display' so that the component stays mounted and doesn't reload images.
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {Data.RECOMMENDATIONS.filter(this.searchFilter).sort((a, b) => (b.timestamp - a.timestamp)).map((rec) => { // Sorts by timestamp in descending order.
            return (
              <RecCard rec={rec} key={rec.id} feed navigation={this.props.navigation} />
            );
          })}
        </ScrollView>
      </View>
    );
  }

  youFeed = () => {
    return (
      <View style={this.state.active === 'You' ? '' : { display: 'none' }}>
        <View style={styles.savingsEarningsBar}>
          <View style={styles.earningsBarHalf}>
            <Text style={styles.earningsBarHeader}>Savings</Text>
            <View style={[styles.earningsBarBubble, { backgroundColor: '#E2F0CB' }]}>
              <NumberFormat
                value={this.props.user.balance}
                displayType="text"
                thousandSeparator
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                renderText={(value) => <Text style={styles.earningsBarBalance}>{value}</Text>}
              />
            </View>
          </View>

          <View style={{
            width: 1, minHeight: 50, maxHeight: 50, backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'center',
          }}
          />

          <View style={styles.earningsBarHalf}>
            <Text style={styles.earningsBarHeader}>Earnings</Text>
            <View style={[styles.earningsBarBubble, { backgroundColor: '#B5EAD7' }]}>
              <NumberFormat
                value={this.props.user.balance}
                displayType="text"
                thousandSeparator
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                renderText={(value) => <Text style={styles.earningsBarBalance}>{value}</Text>}
              />
            </View>
          </View>
        </View>

        <ScrollView
          decelerationRate="fast"
          scrollEventThrottle={200}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 5 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {Data.TRANSACTIONS.map((transaction) => {
            return (
              <EarningsItem transaction={transaction} key={transaction.id} />
            );
          })}
        </ScrollView>
      </View>
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
  savingsEarningsBar: {
    flex: -1,
    flexDirection: 'row',
    height: 80,
    width: wp('100%'),
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 1.5,
    elevation: 2,
    marginTop: -10,
  },
  earningsBarHalf: {
    flex: -1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('50%'),
  },
  earningsBarHeader: {
    color: '#6D7278',
    fontFamily: 'Hiragino W7',
    fontSize: 14,
  },
  earningsBarBubble: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
    paddingBottom: 2,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 12,
    minWidth: 70,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningsBarBalance: {
    color: 'white',
    fontFamily: 'Hiragino W7',
    fontSize: 12,
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
  }
);

export default connect(mapStateToProps, null)(FeedScreen);
