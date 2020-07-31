/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, KeyboardAvoidingView, Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  displayError, signUpUserFirebase, loginWithFacebookFirebase,
} from 'actions';
import AlertDialog from 'components/AlertDialog';
import AppButton from 'components/AppButton';
import { Colors, Images } from 'res';
import LogoHeader from './LogoHeader';
import SignUpForm from './SignUpForm';

const window = Dimensions.get('window');
const small = window.width <= 350;
const large = window.height >= 800;

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        password: false,
      },
    };
  }

  signInWithFacebook = () => {
    this.props.loginWithFacebookFirebase(this.props.navigation);
    this.props.navigation.navigate('SignUpStep', { step: 1 });
  }

  onChange = (text, id) => {
    const newUser = { ...this.state.user };
    const newErrors = { ...this.state.errors };

    newUser[id] = text;
    newErrors[id] = false;
    this.setState(() => { return ({ user: newUser, errors: newErrors }); });
  }

  alreadySignedUp = () => {
    return (
      <View style={styles.signedUpContainer}>
        <Text style={{ color: '#FFFFFF', fontFamily: 'Hiragino W4' }}>Already signed up?</Text>
        <Button type="clear" title="Log in" titleStyle={styles.signedUpButton} onPress={() => { this.props.navigation.navigate('SignIn'); }} />
      </View>
    );
  }

  validateInput = () => {
    const newErrors = { ...this.state.errors };
    let isError = false;
    if (this.state.user.firstName.trim().length <= 0) {
      newErrors.firstName = true;
      isError = true;
    }
    if (this.state.user.lastName.trim().length <= 0) {
      newErrors.lastName = true;
      isError = true;
    }
    if (this.state.user.email.trim().length <= 0) {
      newErrors.email = true;
      isError = true;
    }
    if (this.state.user.password.trim().length <= 0 || this.state.user.password.length < 8) {
      newErrors.password = true;
      isError = true;
    }
    if (this.state.user.phone.trim().length <= 0) {
      newErrors.phone = true;
      isError = true;
    }
    if (this.state.user.password.length < 8) {
      this.props.displayError('Password must be at least 8 characters.');
    }
    this.setState(() => { return ({ errors: newErrors }); });
    return isError;
  }

  signUp = () => {
    if (!this.validateInput()) {
      this.props.navigation.navigate('SignUpStep');
      this.props.signUpUserFirebase(this.state.user, this.props.navigation);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="position">
        <LogoHeader />

        <AppButton
          icon={(<Image source={Images.fbLogo} style={styles.facebookLogo} />)}
          onPress={this.signInWithFacebook}
          title="Sign up with Facebook"
          shadowWidth={1}
          shadowHeight={1}
          backgroundColor={Colors.WHITE}
          width={small ? 300 : 310}
          height={50}
          borderRadius={30}
          textStyle={styles.buttonText}
          style={{ marginTop: small ? 0 : hp('5%') }}
        />

        <Text style={styles.emailText}>or continue with email</Text>

        <SignUpForm errors={this.state.errors} user={this.state.user} onChange={this.onChange} />

        <AppButton
          onPress={this.signUp}
          title={'Let\'s go!'}
          shadowWidth={1}
          shadowHeight={1}
          backgroundColor={Colors.WHITE}
          width={wp('80%')}
          height={40}
          borderRadius={30}
          textStyle={styles.buttonText}
          style={{ marginTop: 30 }}
        />

        {this.alreadySignedUp()}
        <AlertDialog />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: large ? hp('12%') : hp('7%'),
  },
  buttonText: {
    paddingBottom: 5,
    paddingTop: 8,
    fontSize: 18,
    color: Colors.PRIMARY,
    marginLeft: 10,
    fontFamily: 'Hiragino W7',
  },
  facebookLogo: {
    width: 40,
    height: 40,
  },
  emailText: {
    marginTop: 20,
    fontSize: 18,
    paddingBottom: 2,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Hiragino W7',
  },
  signUpInput: {
    color: '#FFFFFF',
    width: wp('80%'),
    borderBottomColor: '#F19F9B',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginTop: 12,
    alignSelf: 'center',
  },
  signedUpContainer: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: small ? 10 : hp('5%'),
    width: wp('100%'),
  },
  signedUpButton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Hiragino W7',
  },
});

export default connect(null, {
  displayError, signUpUserFirebase, loginWithFacebookFirebase,
})(SignUp);
