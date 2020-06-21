/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandshake, faMoneyCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import { signOut, refreshUserInfo } from '../actions';

const window = Dimensions.get('window');
const small = window.width <= 350;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.refreshUserInfo();
  }

  topSection = () => {
    return (
      <View style={styles.topSection}>
        <Text style={styles.headerText}>{this.props.user.firstName}</Text>

        <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={{
              color: 'white', fontFamily: 'Hiragino W7', fontSize: 20, alignSelf: 'center', paddingTop: 8,
            }}
            >
              i
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingTop: 5 }}>
            <Icon name="gear" type="font-awesome" size={45} color="rgba(0,0,0,0.7)" />
            <View style={{ minHeight: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  balanceSection = () => {
    return (
      <View style={styles.balanceSection}>
        <View style={styles.balanceHalf}>
          <Text style={styles.balanceHeader}>Current Balance</Text>
          <NumberFormat value={this.props.user.balance} displayType="text" thousandSeparator prefix="$" renderText={(value) => <Text style={styles.balanceTotal}>{value}</Text>} />
        </View>
        <View style={{ width: 1, minHeight: 60, backgroundColor: '#FFB7B2' }} />
        <View style={styles.balanceHalf}>
          <Text style={styles.balanceHeader}>Lifetime Balance</Text>
          <NumberFormat value={this.props.user.balance} displayType="text" thousandSeparator prefix="$" renderText={(value) => <Text style={styles.balanceTotal}>{value}</Text>} />
        </View>
      </View>
    );
  }

  signOut = () => {
    this.props.signOut();
  }

  openFriends = () => {
    this.props.navigation.navigate('Friends');
  }

  listSection = () => {
    return (
      <View style={{ backgroundColor: '#000000' }}>
        <TouchableOpacity style={styles.listButton} activeOpacity={0.9}>
          <Icon name="shopping-bag" type="font-awesome" size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />
          <Text styles={styles.listText}>Your recommendations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listButton} activeOpacity={0.9} onPress={this.openFriends}>
          <FontAwesomeIcon icon={faHandshake} size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />
          <Text styles={styles.listText}>Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listButton} activeOpacity={0.9}>
          <FontAwesomeIcon icon={faMoneyCheck} size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />
          <Text styles={styles.listText}>Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listButton} activeOpacity={0.9} onPress={this.signOut}>
          <FontAwesomeIcon icon={faSignOutAlt} size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />
          <Text styles={styles.listText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        {this.topSection()}
        <Image source={this.props.user.profilePic ? { uri: this.props.user.profilePic } : require('../assets/blank.png')} style={styles.profilePic} />
        {this.balanceSection()}

        <TouchableOpacity style={styles.venmoButton}>
          <Text style={styles.venmoButtonText}>Transfer to</Text>
          <Image source={require('../assets/venmo_logo.png')} style={{ maxWidth: 80, maxHeight: 15 }} />
        </TouchableOpacity>

        {this.listSection()}
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
    borderBottomColor: 'rgba(235, 102, 96, 0.3)',
    borderBottomWidth: 1,
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
  headerButton: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2,
    backgroundColor: '#FFB7B2',
    borderRadius: 100,
    width: 40,
    height: 40,
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
  },
  profilePic: {
    width: small ? 80 : 120,
    maxWidth: small ? 80 : 120,
    height: small ? 80 : 120,
    maxHeight: small ? 80 : 120,
    borderRadius: 100,
    margin: small ? 10 : 20,
  },
  summaryBubble: {
    marginTop: 20,
    borderColor: '#FFB7B2',
    borderWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 18,
  },
  summaryText: {
    color: 'black',
    fontFamily: 'Hiragino W7',
    fontSize: 18,
    paddingTop: 7,
  },
  infoButton: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    elevation: 2,
    marginBottom: 10,
    marginRight: 10,
  },
  balanceSection: {
    flex: -1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: hp('3%'),
  },
  balanceHalf: {
    marginRight: 15,
    marginLeft: 15,
    flex: -1,
    alignItems: 'center',
  },
  balanceHeader: {
    color: 'black',
    fontFamily: 'Hiragino W4',
    fontSize: 14,
  },
  balanceTotal: {
    color: 'black',
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    marginTop: 6,
  },
  venmoButton: {
    width: wp('80%'),
    height: 40,
    backgroundColor: '#FFB7B2',
    borderRadius: 20,
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  venmoButtonText: {
    color: 'white',
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    paddingTop: 6,
    marginRight: 5,
  },
  listButton: {
    backgroundColor: 'white',
    width: wp('100%'),
    height: hp('8%'),
    flex: -1,
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomColor: 'rgba(151,151,151,0.25)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  listText: {
    color: 'black',
    fontFamily: 'Hiragino W5',
    fontSize: 12,
    paddingTop: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
  }
);

export default connect(mapStateToProps, { signOut, refreshUserInfo })(ProfileScreen);
