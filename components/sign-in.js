/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, KeyboardAvoidingView, StyleSheet, Dimensions, Image, Text, TouchableOpacity, TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { logInUserAuth0, signUpWithFacebookAuth0 } from '../actions';
// import AlertDialog from './alert';

const window = Dimensions.get('window');
const small = window.width <= 350;

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

 logoHeader = () => {
   if (!small) {
     return (
       <View style={styles.logoHeader}>
         <Image source={require('../assets/recroom_logo.png')} style={styles.imageLogo} />
         <View style={styles.appTextContainer}>
           <Text key="rec" style={styles.appText}>rec</Text>
           <Text key="room" style={styles.appText}>room</Text>
         </View>
       </View>
     );
   } else {
     return (
       <View style={styles.logoHeader}>
         <Image source={require('../assets/recroom_logo.png')} style={styles.imageLogoSmall} />
         <View style={styles.appTextContainer}>
           <Text key="rec" style={[styles.appText, { fontSize: 40 }]}>rec</Text>
           <Text key="room" style={[styles.appText, { fontSize: 40 }]}>room</Text>
         </View>
       </View>
     );
   }
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
      newErrors.firstName = true;
      isError = true;
    }
    if (this.state.user.password.trim().length <= 0) {
      newErrors.lastName = true;
      isError = true;
    }

    this.setState(() => { return ({ errors: newErrors }); });
    return isError;
  }

  signInForm = () => {
    const inputStyle = [styles.signUpInput, { fontFamily: 'Hiragino W4' }];
    return (
      <View style={{ marginTop: small ? 20 : hp('5%') }}>
        <TextInput key="email" value={this.state.user.email} placeholder="Email" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'email')} style={[inputStyle, this.state.errors.firstName ? { borderBottomColor: 'red' } : {}]} />
        <TextInput key="lastName" value={this.state.user.password} placeholder="Password" placeholderTextColor="#FFFFFF" onChangeText={(text) => this.onChange(text, 'password')} style={[inputStyle, this.state.errors.lastName ? { borderBottomColor: 'red' } : {}]} secureTextEntry />
      </View>
    );
  }

  login = () => {
    if (!this.validateInput()) {
      this.props.navigation.navigate('SignUpStep');
      this.props.logInUserAuth0(this.state.user, this.props.navigation);
    }
  }

  signInWithFacebook = async () => {
    this.props.signUpWithFacebookAuth0(this.props.navigation);
    this.props.navigation.navigate('SignUpStep', { step: 1 });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.background} behavior="position">
        {this.logoHeader()}

        <TouchableOpacity style={[styles.button, styles.facebookButton]} onPress={this.signInWithFacebook}>
          <Image source={require('../assets/fb_logo.png')} style={styles.facebookLogo} />
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.emailText}>or log in with email</Text>

        {this.signInForm()}

        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={this.login}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

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
    paddingTop: hp('15%'),
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
  appText: {
    fontSize: 48,
    color: '#FFFFFF',
    marginTop: -20,
    fontFamily: 'Hiragino W7',
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
    marginTop: small ? 20 : hp('5%'),
  },
  buttonText: {
    paddingTop: 10,
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
    color: '#FFFFFF',
    textAlign: 'center',
  },
  signUpInput: {
    color: '#FFFFFF',
    width: wp('80%'),
    borderBottomColor: '#F19F9B',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginBottom: 20,
    alignSelf: 'center',
  },
  signedUpButton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Hiragino W7',
    marginTop: 20,
  },
});
