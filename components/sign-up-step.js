/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialIndicator } from 'react-native-indicators';
import {
  CodeField, Cursor, useClearByFocusCell, useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  resetCodeError, displayError, completeSignUpAuth0,
} from '../actions';
import AlertDialog from './alert';

const window = Dimensions.get('window');
const small = window.width <= 350;

const ConfirmationCode = (props) => {
  const [value, setValue] = useState('');
  const CELL_COUNT = 6;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    ref.current.focus();

    if (value.length >= CELL_COUNT) {
      props.confirm(props.username, value, props.onFulfill);
      setValue('');
    }

    if (value.length > 0) {
      props.resetError();
    }
  }, [value]);

  return (
    <CodeField
      ref={ref}
      {...cellProps}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={{ width: wp('80%') }}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}
        >
          <Text style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </View>
      )}
    />
  );
};

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
  cellRoot: {
    width: wp('12%'),
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  focusCell: {
    borderBottomWidth: 4,
  },
  confirmationText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Hiragino W5',
    position: 'absolute',
    top: 50,
    padding: 15,
  },
  cellText: {
    color: '#fff',
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Hiragino W7',
  },
  styled: {
    fontFamily: 'Hiragino W7',
  },
  unstyled: {
    fontFamily: 'System',
  },
  header1: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  header2: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  orText: {
    alignSelf: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  buttonContainer: {
    flex: -1,
    flexDirection: 'column',
    maxHeight: 200,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    marginTop: 10,
  },
  imageButton: {
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 2, width: 0 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, // IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    minWidth: 120,
    minHeight: 120,
    maxWidth: 120,
    maxHeight: 120,
    borderRadius: 150,
    flex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordInput: {
    color: '#FFFFFF',
    width: wp('80%'),
    borderBottomColor: '#F19F9B',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 16,
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
  signUpButton: {
    width: wp('80%'),
    minHeight: 40,
    maxHeight: 40,
    marginTop: hp('10%'),
  },
  signUpButtonText: {
    paddingTop: 10,
    fontSize: 18,
    color: '#FFB7B2',
    marginLeft: 10,
    fontFamily: 'Hiragino W7',
  },
});

const mapStateToProps = (reduxState) => (
  {
    isFontLoaded: reduxState.lifecycle.fontsLoaded,
    user: reduxState.user,
    loading: reduxState.lifecycle.loading,
    codeError: reduxState.lifecycle.codeError,
  }
);

export default connect(mapStateToProps, {
  resetCodeError, displayError, completeSignUpAuth0,
})(SignUpStep);
