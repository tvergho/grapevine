/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import * as Font from 'expo-font';
import {
  View, StyleSheet, Image, StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import {
  SignUp, SignIn, SignUpStep,
} from 'screens';
import {
  setAppLoaded, signOut, authUser, getUserInfo,
} from 'actions';
import { Images } from 'res';
import auth from '@react-native-firebase/auth';
import MainApp from './MainApp';

const Stack = createStackNavigator();

// Header for the sign up step screen.
const LogoHeader = () => {
  return (
    <Image source={Images.recroomHeader} style={{ minHeight: 80, width: wp('100%'), resizeMode: 'contain' }} />
  );
};

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.onMount();
    StatusBar.setBarStyle('dark-content', true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.appLoaded !== prevProps.appLoaded && this.props.appLoaded) {
      setTimeout(() => { SplashScreen.hide(); }, 400);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeListener) this.unsubscribeListener();
  }

  onMount = async () => {
    await Font.loadAsync({
      'Hiragino W4': require('assets/fonts/HiraginoSans-W4.otf'),
      'Hiragino W5': require('assets/fonts/HiraginoSans-W5.otf'),
      'Hiragino W7': require('assets/fonts/HiraginoSans-W7.otf'),
    });

    this.unsubscribeListener = auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  handleAuthStateChange = (user) => {
    if (user) {
      this.props.authUser(user);
      this.props.getUserInfo(user);
    } else {
      this.props.setAppLoaded();
    }
  }

  loading = () => {
    return (
      <View style={styles.splash}>
        <Image source={Images.splash} style={{ width: wp('100%'), height: hp('100%'), resizeMode: 'contain' }} />
      </View>
    );
  }

  render() {
    return (
      this.props.appLoaded
        ? (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="SignUp"
            >
              {!this.props.isAuthenticated ? (
                <>
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      title: 'SignUp',
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                      title: 'SignIn',
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="SignUpStep"
                    component={SignUpStep}
                    options={{ headerTitle: (props) => <LogoHeader {...props} /> }}
                  />
                </>
              ) : (
                <Stack.Screen
                  name="MainApp"
                  component={MainApp}
                  options={{ headerShown: false }}
                />
              ) }
            </Stack.Navigator>
          </NavigationContainer>
        )
        : this.loading()
    );
  }
}

const styles = StyleSheet.create({
  splash: {
    backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (reduxState) => (
  {
    isAuthenticated: reduxState.auth.authenticated,
    appLoaded: reduxState.lifecycle.appLoaded,
  }
);

export default connect(mapStateToProps, {
  setAppLoaded, signOut, authUser, getUserInfo,
})(AppContainer);
