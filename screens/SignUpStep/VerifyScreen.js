/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from 'res';
import AppButton from 'components/AppButton';
import { setSignupStep, setVerificationError, verifyPhoneCode } from 'actions';
import { connect } from 'react-redux';
import ConfirmationCode from './ConfirmationCode';

const VerifyScreen = (props) => {
  return (
    <View style={styles.background}>
      <Text style={styles.instructions}>Enter your confirmation code.</Text>
      <Text style={styles.error}>{props.error ? 'There was an error with the confirmation code.' : ''}</Text>
      <AppButton
        title="Change phone number"
        backgroundColor={Colors.PRIMARY}
        textStyle={styles.buttonText}
        style={styles.changeButton}
        onPress={() => { props.setSignupStep('phone'); }}
      />
      <ConfirmationCode confirm={(code) => { props.verifyPhoneCode(code); }} onChange={() => { props.setVerificationError(false); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: Colors.WHITE,
    fontFamily: 'Hiragino W5',
    fontSize: 20,
    position: 'absolute',
    top: 80,
    padding: 15,
    textAlign: 'center',
    lineHeight: 25,
  },
  error: {
    color: 'red',
    position: 'absolute',
    top: 180,
    textAlign: 'center',
  },
  changeButton: {
    position: 'absolute',
    top: 140,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: 'Hiragino W4',
    fontSize: 14,
    paddingBottom: 5,
  },
});

const mapStateToProps = (reduxState) => (
  {
    error: reduxState.auth.verificationError,
  }
);

export default connect(mapStateToProps, { setSignupStep, setVerificationError, verifyPhoneCode })(VerifyScreen);
