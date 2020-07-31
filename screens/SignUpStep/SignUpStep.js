import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import AlertDialog from 'components/AlertDialog';
import { connect } from 'react-redux';
import LinkScreen from './LinkScreen';

const SignUpStep = ({ step }) => {
  const renderContent = () => {
    switch (step) {
    case 'link':
      return <LinkScreen />;
    default:
      return <MaterialIndicator color="white" size={100} />;
    }
  };

  return (
    <>
      <View style={styles.background}>
        {renderContent()}
      </View>

      <AlertDialog />
    </>
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
