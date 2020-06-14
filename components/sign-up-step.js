/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component, useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import * as SecureStore from 'expo-secure-store';
import { MaterialIndicator } from 'react-native-indicators';
import {
  CodeField, Cursor, useClearByFocusCell, useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { authUser, resetCodeError, confirmUser } from '../actions';
import AlertDialog from './alert';

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

class SignUpStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
    };
  }

  navigate = () => {
    this.setState((prevState) => {
      return {
        step: prevState.step + 1,
      };
    });
  }

  buyButtonPress = () => {
    const { user } = this.props;

    if (user.fbToken.length > 0) {
      SecureStore.setItemAsync('fbtoken', user.fbToken);
    }

    this.props.authUser(user.email, user.password);
  }

  buttons = () => {
    return (
      <View style={{
        flex: -1, flexDirection: 'row',
      }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={this.buyButtonPress}>
            <Icon name="shopping-cart" type="font-awesome" size={60} color="rgba(0,0,0,0.8)" style={{ paddingRight: 4 }} />
          </TouchableOpacity>
          <Text style={this.props.isFontLoaded ? [styles.header2, styles.buttonText, styles.styled] : [styles.header2, styles.buttonText, styles.unstyled]}>Buyer</Text>
        </View>
        <Text style={this.props.isFontLoaded ? [styles.header2, styles.orText, styles.styled] : [styles.header2, styles.orText, styles.unstyled]}>or</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton}>
            <FontAwesomeIcon icon={faUserTie} size={60} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
          <Text style={this.props.isFontLoaded ? [styles.header2, styles.buttonText, styles.styled] : [styles.header2, styles.buttonText, styles.unstyled]}>Business</Text>
        </View>
      </View>
    );
  }

  buyOrBiz = () => {
    return (
      <View style={styles.background}>
        <Text style={this.props.isFontLoaded ? [styles.header1, styles.styled] : [styles.header1, styles.unstyled]}>Great! Are you a</Text>
        {this.buttons()}
        <AlertDialog />
      </View>
    );
  }

  confirmationStep = () => {
    return (
      <View style={styles.background}>
        <Text style={styles.confirmationText}>{`Enter the confirmation code sent to: ${this.props.user.email}`}</Text>
        <Text style={{
          color: 'red', fontSize: 14, position: 'absolute', top: 130, fontFamily: 'Hiragino W4', opacity: this.props.codeError ? 1 : 0,
        }}
        >
          Invalid code
        </Text>
        <ConfirmationCode username={this.props.user.username} onFulfill={this.navigate} resetError={this.props.resetCodeError} confirm={this.props.confirmUser} />
      </View>

    );
  }

  renderStep = () => {
    switch (this.state.step) {
    case 0:
      return this.confirmationStep();
    case 1:
      return this.buyOrBiz();
    default:
      return null;
    }
  }

  render() {
    return (
      this.props.loading ? (
        <View style={styles.background}>
          <MaterialIndicator color="white" size={100} />
        </View>
      ) : (
        this.renderStep()
      )
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
});

const mapStateToProps = (reduxState) => (
  {
    isFontLoaded: reduxState.lifecycle.fontsLoaded,
    user: reduxState.user,
    loading: reduxState.lifecycle.loading,
    codeError: reduxState.lifecycle.codeError,
  }
);

export default connect(mapStateToProps, { authUser, resetCodeError, confirmUser })(SignUpStep);
