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
import { signOut, refreshUserInfo } from 'actions';
import MainHeader from 'components/MainHeader';
import AppButton from 'components/AppButton';
import { Colors, Images } from 'res';
import BalanceSection from './BalanceSection';
import ProfileListItem from './ProfileListItem';

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
      <MainHeader title={this.props.user.firstName} border>
        <View style={{ flex: -1, flexDirection: 'row', alignItems: 'center' }}>
          <AppButton
            shadowHeight={2}
            borderRadius={100}
            backgroundColor={Colors.PRIMARY}
            width={40}
            height={40}
            title="i"
            textStyle={styles.infoButton}
            style={{
              marginBottom: 10,
              marginRight: 10,
              marginLeft: 5,
            }}
          />

          <TouchableOpacity style={{ paddingTop: 5 }}>
            <Icon name="gear" type="font-awesome" size={45} color="rgba(0,0,0,0.7)" />
            <View style={{ minHeight: 15 }} />
          </TouchableOpacity>
        </View>
      </MainHeader>
    );
  }

  signOut = () => {
    this.props.signOut();
  }

  listSection = () => {
    return (
      <View style={{ backgroundColor: '#000000' }}>
        <ProfileListItem title="Your recommendations"
          onPress={() => { this.props.navigation.navigate('YourRecs'); }}
          icon={<Icon name="shopping-bag" type="font-awesome" size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />}
        />

        <ProfileListItem title="Friends"
          onPress={() => { this.props.navigation.navigate('Friends'); }}
          icon={<FontAwesomeIcon icon={faHandshake} size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />}
        />

        <ProfileListItem title="Accounts"
          onPress={() => { this.props.navigation.navigate('Payment'); }}
          icon={<FontAwesomeIcon icon={faMoneyCheck} size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />}
        />

        <ProfileListItem title="Sign out"
          onPress={this.signOut}
          icon={<FontAwesomeIcon icon={faSignOutAlt} size={25} color="rgba(0,0,0,0.7)" style={{ marginRight: 20 }} />}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        {this.topSection()}
        <Image source={this.props.user.profilePic ? { uri: this.props.user.profilePic } : Images.blankProfile} style={styles.profilePic} />
        <BalanceSection balance={this.props.user.balance} />

        <TouchableOpacity style={styles.venmoButton}>
          <Text style={styles.venmoButtonText}>Transfer to</Text>
          <Image source={Images.venmoLogo} style={{ maxWidth: 80, maxHeight: 15 }} />
        </TouchableOpacity>

        {this.listSection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    alignItems: 'center',
  },
  profilePic: {
    width: small ? 80 : 120,
    maxWidth: small ? 80 : 120,
    height: small ? 80 : 120,
    maxHeight: small ? 80 : 120,
    borderRadius: 100,
    margin: small ? 10 : 20,
  },
  infoButton: {
    color: Colors.WHITE,
    fontFamily: 'Hiragino W7',
    fontSize: 20,
    alignSelf: 'center',
    paddingTop: 8,
  },
  venmoButton: {
    width: wp('80%'),
    height: 40,
    backgroundColor: Colors.PRIMARY,
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
    marginRight: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    user: reduxState.user,
  }
);

export default connect(mapStateToProps, { signOut, refreshUserInfo })(ProfileScreen);
