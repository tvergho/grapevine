import React from 'react';
import {
  View, StyleSheet, TextInput, Dimensions,
} from 'react-native';
import { Colors } from 'res';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const window = Dimensions.get('window');
const small = window.width <= 350;

const SignInForm = ({ user, onChange, errors }) => {
  return (
    <View style={{ marginTop: small ? 20 : hp('5%') }}>
      <TextInput
        key="email"
        value={user.email}
        placeholder="Email"
        placeholderTextColor="#FFFFFF"
        onChangeText={(text) => onChange(text, 'email')}
        style={[styles.signUpInput, errors.email ? { borderBottomColor: 'red' } : {}]}
        keyboardType="email-address"
        autoCompleteType="email"
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
    marginBottom: 20,
    fontFamily: 'Hiragino W4',
    alignSelf: 'center',
  },
});

export default SignInForm;
