import React from 'react';
import {
  View, StyleSheet, TextInput, Dimensions,
} from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const window = Dimensions.get('window');
const small = window.width <= 350;

const SignUpForm = ({ user, onChange, errors }) => {
  return (
    <View style={{ marginTop: small ? 10 : hp('3%') }}>
      <TextInput
        key="firstName"
        value={user.firstName}
        placeholder="First name"
        placeholderTextColor="#FFFFFF"
        onChangeText={(text) => onChange(text, 'firstName')}
        style={[styles.signUpInput, errors.firstName ? { borderBottomColor: 'red' } : {}]}
      />
      <TextInput
        key="lastName"
        value={user.lastName}
        placeholder="Last name"
        placeholderTextColor="#FFFFFF"
        onChangeText={(text) => onChange(text, 'lastName')}
        style={[styles.signUpInput, errors.lastName ? { borderBottomColor: 'red' } : {}]}
      />
      <TextInput
        key="email"
        value={user.email}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        onChangeText={(text) => onChange(text, 'email')}
        style={[styles.signUpInput, errors.email ? { borderBottomColor: 'red' } : {}]}
        autoCompleteType="email"
      />
      <TextInput
        key="phone"
        value={user.phone}
        keyboardType="phone-pad"
        placeholder="Phone"
        placeholderTextColor="#FFFFFF"
        onChangeText={(text) => onChange(text, 'phone')}
        style={[styles.signUpInput, errors.phone ? { borderBottomColor: 'red' } : {}]}
      />
      <TextInput
        key="password"
        value={user.password}
        placeholder="Password"
        placeholderTextColor="#FFFFFF"
        onChangeText={(text) => onChange(text, 'password')}
        style={[styles.signUpInput, errors.password ? { borderBottomColor: 'red' } : {}]}
        secureTextEntry
      />
    </View>
  );
};

const styles = StyleSheet.create({
  signUpInput: {
    color: Colors.WHITE,
    width: wp('80%'),
    borderBottomColor: '#F19F9B',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginTop: 12,
    alignSelf: 'center',
    fontFamily: 'Hiragino W4',
  },
});

export default SignUpForm;
