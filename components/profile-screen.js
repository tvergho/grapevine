/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import Info from '../assets/info.svg';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  topSection = () => {
    console.log(this.props.user);
    return (
      <>
        <Text style={styles.headerText}>{this.props.user.firstName}</Text>
        <View style={styles.topSection}>
          <TouchableOpacity>
            <Icon name="gear" type="font-awesome" size={40} color="rgba(0,0,0,0.7)" />
            <View style={{ minHeight: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Info style={styles.infoButton} />
          </TouchableOpacity>
        </View>
      </>
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
    marginTop: hp('7%'),
    paddingLeft: 15,
    flex: 1,
    maxHeight: 40,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: 'black',
    fontFamily: 'Hiragino W7',
    fontSize: 24,
    position: 'absolute',
    top: hp('7%'),
    left: 15,
  },
  profilePic: {
    width: 120,
    maxWidth: 120,
    height: 120,
    maxHeight: 120,
    borderRadius: 100,
    margin: 20,
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
    marginTop: 20,
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
    marginTop: 20,
  },
  venmoButtonText: {
    color: 'white',
    fontFamily: 'Hiragino W7',
    fontSize: 14,
    paddingTop: 6,
    marginRight: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
  }
);

export default connect(mapStateToProps, null)(ProfileScreen);
