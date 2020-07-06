/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SplashScreen from 'expo-splash-screen';
import Geocoder from 'react-native-geocoding';
import {
  SignUp, SignIn, SignUpStep,
} from 'screens';
import {
  setAppLoaded, signOut, tryAuth0OnStart,
} from 'actions';
import { Images } from 'res';
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
    // Loads all the custom fonts needed for the app upon startup.
    // Notifies the other views via the Redux state if the fonts were not loaded.
    Font.loadAsync({
      'Hiragino W4': require('assets/fonts/HiraginoSans-W4.otf'),
      'Hiragino W5': require('assets/fonts/HiraginoSans-W5.otf'),
      'Hiragino W7': require('assets/fonts/HiraginoSans-W7.otf'),
    })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        this.props.tryAuth0OnStart();
        Geocoder.init('AIzaSyDgbpn2Mnmxm_YmEnuuQKOJT5zMcD6XW90');
      });
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);

    if (this.props !== prevProps) {
      if (this.props.appLoaded) {
        setTimeout(() => { SplashScreen.hideAsync(); }, 400);
      }
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
    backgroundColor: '#FFB7B2',
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
  setAppLoaded, tryAuth0OnStart, signOut,
})(AppContainer);
