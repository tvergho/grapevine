/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as Facebook from 'expo-facebook';
import { signUpUser, displayError, signInFacebook } from '../actions';
import AlertDialog from './alert';

const window = Dimensions.get('window');
const small = window.width <= 350;

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

  signInWithFacebook = async () => {
    await Facebook.initializeAsync();

    Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    })
      .then((response) => {
        const { type, token } = response;

        if (type === 'success') {
          this.props.signInFacebook(token);
          this.props.navigation.navigate('SignUpStep');
        } else {
          this.props.displayError('There was an error while logging in.');
        }
      })
      .catch((error) => {
        this.props.displayError(error.message);
      });
  }

  onChange = (text, id) => {
    const newUser = { ...this.state.user };
    const newErrors = { ...this.state.errors };

    newUser[id] = text;
    newErrors[id] = false;
    this.setState(() => { return ({ user: newUser, errors: newErrors }); });
  }

  logoHeader = () => {
    if (!small) {
      return (
        <View style={styles.logoHeader}>
          <Image source={require('../assets/recroom_logo.png')} style={styles.imageLogo} />
          <View style={styles.appTextContainer}>
            <Text key="rec" style={this.props.isFontLoaded ? [styles.appText, styles.styled] : [styles.appText, styles.unstyled]}>rec</Text>
            <Text key="room" style={this.props.isFontLoaded ? [styles.appText, styles.styled] : [styles.appText, styles.unstyled]}>room</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.logoHeader}>
          <Image source={require('../assets/recroom_logo.png')} style={styles.imageLogoSmall} />
          <View style={styles.appTextContainer}>
            <Text key="rec" style={this.props.isFontLoaded ? [styles.appText, styles.styled, { fontSize: 40 }] : [styles.appText, styles.unstyled, { fontSize: 40 }]}>rec</Text>
            <Text key="room" style={this.props.isFontLoaded ? [styles.appText, styles.styled, { fontSize: 40 }] : [styles.appText, styles.unstyled, { fontSize: 40 }]}>room</Text>
          </View>
        </View>
      );
    }
  }

  signUpForm = () => {
    const inputStyle = this.props.isFontLoaded ? [styles.signUpInput, { fontFamily: 'Hiragino W4' }] : [styles.signUpInput, { fontFamily: 'System' }];
    return (
      <View style={{ marginTop: small ? 10 : hp('3%') }}>
        <TextInput key="firstName" value={this.state.user.firstName} placeholder="First name" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'firstName')} style={[inputStyle, this.state.errors.firstName ? { borderBottomColor: 'red' } : {}]} />
        <TextInput key="lastName" value={this.state.user.lastName} placeholder="Last name" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'lastName')} style={[inputStyle, this.state.errors.lastName ? { borderBottomColor: 'red' } : {}]} />
        <TextInput key="email" value={this.state.user.email} keyboardType="email-address" placeholder="Email" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'email')} style={[inputStyle, this.state.errors.email ? { borderBottomColor: 'red' } : {}]} />
        <TextInput key="phone" value={this.state.user.phone} keyboardType="phone-pad" placeholder="Phone" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'phone')} style={[inputStyle, this.state.errors.phone ? { borderBottomColor: 'red' } : {}]} />
        <TextInput key="password" value={this.state.user.password} placeholder="Password" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'password')} style={[inputStyle, this.state.errors.password ? { borderBottomColor: 'red' } : {}]} secureTextEntry />
      </View>
    );
  }

  alreadySignedUp = () => {
    return (
      <View style={styles.signedUpContainer}>
        <Text style={this.props.isFontLoaded ? { color: '#FFFFFF', fontFamily: 'Hiragino W4' } : { color: '#FFFFFF', fontFamily: 'System' }}>Already signed up?</Text>
        <Button type="clear" title="Log in" titleStyle={this.props.isFontLoaded ? [styles.signedUpButton, styles.styled] : [styles.signedUpButton, styles.unstyled]} />
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
    if (this.state.user.password.trim().length <= 0) {
      newErrors.password = true;
      isError = true;
    }
    if (this.state.user.phone.trim().length <= 0) {
      newErrors.phone = true;
      isError = true;
    }
    this.setState(() => { return ({ errors: newErrors }); });
    return isError;
  }

  signUp = () => {
    if (!this.validateInput()) {
      this.props.navigation.navigate('SignUpStep');
      this.props.signUpUser(this.state.user, this.props.navigation);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="position">
        {this.logoHeader()}

        <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={this.signInWithFacebook}>
          <Image source={require('../assets/fb_logo.png')} style={styles.facebookLogo} />
          <Text style={this.props.isFontLoaded ? [styles.buttonText, styles.styled] : [styles.buttonText, styles.unstyled]}>Sign up with Facebook</Text>
        </TouchableOpacity>
        <Text style={this.props.isFontLoaded ? [styles.emailText, styles.styled] : [styles.emailText, styles.unstyled]}>or continue with email</Text>

        {this.signUpForm()}

        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={this.signUp}>
          <Text style={this.props.isFontLoaded ? [styles.buttonText, styles.styled] : [styles.buttonText, styles.unstyled]}>{'Let\'s go!'}</Text>
        </TouchableOpacity>

        {this.alreadySignedUp()}

        <AlertDialog />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFB7B2',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeader: {
    flex: -1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 100,
    marginTop: 10,
  },
  imageLogo: {
    width: 85,
    height: 85,
    marginRight: 20,
  },
  imageLogoSmall: {
    width: 65,
    height: 65,
    marginRight: 20,
  },
  appTextContainer: {
    paddingTop: 10,
  },
  styled: {
    fontFamily: 'Hiragino W7',
  },
  unstyled: {
    fontFamily: 'System',
  },
  appText: {
    fontSize: 48,
    color: '#FFFFFF',
    marginTop: -20,
  },
  button: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  facebookButton: {
    width: small ? 300 : 310,
    minHeight: 50,
    maxHeight: 50,
    marginTop: small ? 0 : hp('5%'),
  },
  signUpButton: {
    width: wp('80%'),
    minHeight: 40,
    maxHeight: 40,
    marginTop: 30,
  },
  buttonText: {
    paddingTop: 10,
    fontSize: 18,
    color: '#FFB7B2',
    marginLeft: 10,
  },
  facebookLogo: {
    width: 40,
    height: 40,
  },
  emailText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
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
  },
});

const mapStateToProps = (reduxState) => (
  {
    isFontLoaded: reduxState.lifecycle.fontsLoaded,
  }
);

export default connect(mapStateToProps, { signUpUser, displayError, signInFacebook })(SignUp);
