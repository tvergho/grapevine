import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import AlertDialog from 'components/AlertDialog';

const SignUpStep = () => {
  return (
    <>
      <View style={styles.background}>
        <MaterialIndicator color="white" size={100} />
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

export default SignUpStep;
