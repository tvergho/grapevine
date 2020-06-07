/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image, TouchableOpacity, TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { signUpUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    };
  }

  onChange = (text, id) => {
    this.setState({ [id]: text });
  }

  logoHeader = () => {
    return (
      <View style={styles.logoHeader}>
        <Image source={require('../assets/recroom_logo.png')} style={styles.imageLogo} />
        <View style={styles.appTextContainer}>
          <Text style={this.props.isFontLoaded ? [styles.appText, styles.styled] : [styles.appText, styles.unstyled]}>rec</Text>
          <Text style={this.props.isFontLoaded ? [styles.appText, styles.styled] : [styles.appText, styles.unstyled]}>room</Text>
        </View>
      </View>
    );
  }

  signUpForm = () => {
    const inputStyle = this.props.isFontLoaded ? [styles.signUpInput, { fontFamily: 'Hiragino W3' }] : [styles.signUpInput, { fontFamily: 'System' }];
    return (
      <View style={{ marginTop: 20 }}>
        <TextInput value={this.state.firstName} placeholder="First name" placeholderTextColor="#FFFFFF" onChange={(text) => this.onChange(text, 'firstName')} style={inputStyle} />
        <TextInput value={this.state.lastName} placeholder="Last name" placeholderTextColor="#FFFFFF" onChange={(text) => this.onChange(text, 'lastName')} style={inputStyle} />
        <TextInput value={this.state.email} keyboardType="email-address" placeholder="Email" placeholderTextColor="#FFFFFF" onChange={(text) => this.onChange(text, 'email')} style={inputStyle} />
        <TextInput value={this.state.phone} keyboardType="phone-pad" placeholder="Phone" placeholderTextColor="#FFFFFF" onChange={(text) => this.onChange(text, 'phone')} style={inputStyle} />
        <TextInput value={this.state.password} placeholder="Password" placeholderTextColor="#FFFFFF" onChange={(text) => this.onChange(text, 'password')} style={inputStyle} secureTextEntry />
      </View>
    );
  }

  alreadySignedUp = () => {
    return (
      <View style={styles.signedUpContainer}>
        <Text style={this.props.isFontLoaded ? { color: '#FFFFFF', fontFamily: 'Hiragino W3' } : { color: '#FFFFFF', fontFamily: 'System' }}>Already signed up?</Text>
        <Button type="clear" title="Log in" titleStyle={this.props.isFontLoaded ? [styles.signedUpButton, styles.styled] : [styles.signedUpButton, styles.unstyled]} />
      </View>
    );
  }

  signUp = () => {
    this.props.navigation.navigate('SignUpStep');
    this.props.signUpUser(this.state);
  }

  render() {
    return (
      <View style={styles.background}>
        {this.logoHeader()}

        <TouchableOpacity style={[styles.button, styles.facebookButton]}>
          <Image source={require('../assets/fb_logo.png')} style={styles.facebookLogo} />
          <Text style={this.props.isFontLoaded ? [styles.buttonText, styles.styled] : [styles.buttonText, styles.unstyled]}>Sign up with Facebook</Text>
        </TouchableOpacity>
        <Text style={this.props.isFontLoaded ? [styles.emailText, styles.styled] : [styles.emailText, styles.unstyled]}>or continue with email</Text>

        {this.signUpForm()}

        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={this.signUp}>
          <Text style={this.props.isFontLoaded ? [styles.buttonText, styles.styled] : [styles.buttonText, styles.unstyled]}>{'Let\'s go!'}</Text>
        </TouchableOpacity>

        {this.alreadySignedUp()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFB7B2',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
    maxHeight: 100,
  },
  imageLogo: {
    width: 85,
    height: 85,
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
  },
  facebookButton: {
    minWidth: 310,
    minHeight: 50,
    maxHeight: 50,
    marginTop: 20,
  },
  signUpButton: {
    minWidth: 250,
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
  },
  signUpInput: {
    color: '#FFFFFF',
    minWidth: 250,
    borderBottomColor: '#F19F9B',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginTop: 12,
  },
  signedUpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

export default connect(mapStateToProps, { signUpUser })(SignUp);
