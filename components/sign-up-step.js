/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-constructor */
import React, { Component, useState, useEffect } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { MaterialIndicator } from 'react-native-indicators';
import {
  CodeField, Cursor, useClearByFocusCell, useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput } from 'react-native-gesture-handler';
import { Hub } from 'aws-amplify';
import {
  signInUser, resetCodeError, confirmUser, signUpUser, displayError, getUser, getFBUser, setPassword, testIfUserExists,
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

class SignUpStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      password: '',
      getFBUser: false,
    };
  }

  componentDidMount() {
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
      case 'signIn': {
        console.log('sign in', data);
        if (!this.state.getFBUser) {
          this.props.testIfUserExists();
          this.setState({ getFBUser: true });
        }
        break;
      }
      case 'signIn_failure': {
        if (data.message === 'An account with the given email already exists.') this.props.getUser();
        break;
      }
      default:
        console.log(event, data);
        break;
      }
    });
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
    this.props.signInUser(user.email, user.password);
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

  updatePassword = (password) => {
    this.setState({ password });
  }

  fbNext = () => {
    this.props.setPassword(this.state.password);
    this.navigate();
  }

  confirmationStep = () => {
    const { email } = this.props.user;

    if (!this.props.route.params || !this.props.route.params.fb) {
      return (
        <View style={styles.background}>
          <Text style={styles.confirmationText}>{`Enter the confirmation code sent to: ${this.props.user.email}`}</Text>
          <Text style={{
            color: 'red', fontSize: 14, position: 'absolute', top: small ? 170 : 130, fontFamily: 'Hiragino W4', opacity: this.props.codeError ? 1 : 0,
          }}
          >
            Invalid code
          </Text>
          <ConfirmationCode username={this.props.user.username} onFulfill={this.navigate} resetError={this.props.resetCodeError} confirm={this.props.confirmUser} />
        </View>
      );
    } else {
      return (
        <View style={styles.background}>
          <Text style={styles.confirmationText}>Finish setting up your account</Text>

          <View style={{ flex: -1, flexDirection: 'column', height: hp('40%') }}>
            <Text style={{
              color: 'white', fontSize: 16, fontFamily: 'Hiragino W5', alignSelf: 'flex-start',
            }}
            >
              {`Email: ${email}`}
            </Text>
            <TextInput style={styles.passwordInput} value={this.state.password} secureTextEntry onChangeText={this.updatePassword} placeholder="Enter a password" placeholderTextColor="#ffffff" />

            <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={this.fbNext}>
              <Text style={styles.signUpButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
  signInUser, resetCodeError, confirmUser, signUpUser, displayError, getUser, getFBUser, setPassword, testIfUserExists,
})(SignUpStep);
