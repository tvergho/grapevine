import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import LinkScreen from './LinkScreen';
import PhoneScreen from './PhoneScreen';
import VerifyScreen from './VerifyScreen';

const SignUpStep = ({ step }) => {
  const renderContent = () => {
    switch (step) {
    case 'link':
      return <LinkScreen />;
    case 'phone':
      return <PhoneScreen />;
    case 'verify':
      return <VerifyScreen />;
    default:
      return <MaterialIndicator color="white" size={100} />;
    }
  };

  return (
    <View style={styles.background}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFB7B2',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (reduxState) => (
  {
    step: reduxState.lifecycle.signUpStep,
  }
);

export default connect(mapStateToProps, null)(SignUpStep);
