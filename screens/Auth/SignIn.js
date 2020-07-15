/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  KeyboardAvoidingView, StyleSheet, Dimensions, Image, Text,
} from 'react-native';
import { Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { logInUserAuth0, signUpWithFacebookAuth0 } from 'actions';
import AppButton from 'components/AppButton';
import { Images, Colors } from 'res';
import LogoHeader from './LogoHeader';
import SignInForm from './SignInForm';

const window = Dimensions.get('window');
const small = window.width <= 350;
const large = window.height >= 800;

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      errors: {
        email: false,
        password: false,
      },
    };
  }

  onChange = (text, id) => {
    const newUser = { ...this.state.user };
    const newErrors = { ...this.state.errors };

    newUser[id] = text;
    newErrors[id] = false;
    this.setState(() => { return ({ user: newUser, errors: newErrors }); });
  }

  validateInput = () => {
    const newErrors = { ...this.state.errors };
    let isError = false;
    if (this.state.user.email.trim().length <= 0) {
      newErrors.email = true;
      isError = true;
    }
    if (this.state.user.password.trim().length <= 0) {
      newErrors.password = true;
      isError = true;
    }

    this.setState(() => { return ({ errors: newErrors }); });
    console.log(newErrors);
    return isError;
  }

  login = () => {
    if (!this.validateInput()) {
      this.props.navigation.navigate('SignUpStep');
      this.props.logInUserAuth0(this.state.user, this.props.navigation);
    }
  }

  signInWithFacebook = () => {
    this.props.signUpWithFacebookAuth0(this.props.navigation);
    this.props.navigation.navigate('SignUpStep');
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="position">
        <LogoHeader />

        <AppButton
          icon={(<Image source={Images.fbLogo} style={styles.facebookLogo} />)}
          onPress={this.signInWithFacebook}
          title="Sign in with Facebook"
          shadowWidth={1}
          shadowHeight={1}
          backgroundColor={Colors.WHITE}
          width={small ? 300 : 310}
          height={50}
          borderRadius={30}
          textStyle={styles.buttonText}
          style={{ marginTop: small ? 0 : hp('5%') }}
        />

        <Text style={styles.emailText}>or log in with email</Text>

        <SignInForm user={this.state.user} errors={this.state.errors} onChange={this.onChange} />

        <AppButton
          onPress={this.login}
          title="Sign in"
          shadowWidth={1}
          shadowHeight={1}
          backgroundColor={Colors.WHITE}
          width={wp('80%')}
          height={40}
          borderRadius={30}
          textStyle={styles.buttonText}
          style={{ marginTop: 30 }}
        />

        <Button type="clear" title="Sign up instead" titleStyle={styles.signedUpButton} onPress={() => { this.props.navigation.goBack(); }} />

      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, { logInUserAuth0, signUpWithFacebookAuth0 })(SignIn);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFB7B2',
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
    color: '#FFB7B2',
    fontFamily: 'Hiragino W7',
    marginLeft: 10,
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
  signedUpButton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Hiragino W7',
    marginTop: 40,
  },
});
