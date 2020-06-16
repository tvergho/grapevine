/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component } from 'react';
import * as Font from 'expo-font';
import { View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import * as SecureStore from 'expo-secure-store';
import {
  setFontsLoaded, setAppLoaded, signInOnStart, signOut,
} from '../actions';
import SignUp from './sign-up';
import SignUpStep from './sign-up-step';
import FeedScreen from './feed-screen';
import HomeScreen from './home-screen';
import ProfileScreen from './profile-screen';
import Business from './business';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Header for the sign up step screen.
const LogoHeader = () => {
  return (
    <Image source={require('../assets/recroom_header.png')} style={{ minHeight: 80, width: wp('100%'), resizeMode: 'contain' }} />
  );
};

const FeedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: '#FFB7B2' }}>
      <Tab.Screen name="Feed"
        component={FeedNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="bullhorn" type="font-awesome" color={color} size={size} />) }}
      />
      <Tab.Screen name="Home"
        component={HomeNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="home" type="font-awesome" color={color} size={size} />) }}
      />
      <Tab.Screen name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="user" type="font-awesome" color={color} size={size} />) }}
      />
    </Tab.Navigator>
  );
};

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    signOut();

    // Loads all the custom fonts needed for the app upon startup.
    // Notifies the other views via the Redux state if the fonts were not loaded.
    Font.loadAsync({
      'Hiragino W4': require('../assets/fonts/HiraginoSans-W4.otf'),
      'Hiragino W5': require('../assets/fonts/HiraginoSans-W5.otf'),
      'Hiragino W7': require('../assets/fonts/HiraginoSans-W7.otf'),
    })
      .then((result) => {
        this.props.setFontsLoaded();
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        this.props.signInOnStart();
        /*
        SecureStore.getItemAsync('fbtoken') // Checks whether the user has previously logged in via Facebook.
          .then((token) => {
            if (token) this.props.tryFacebookSignInOnStart(token); // Attempt to authenticate the user via Facebook.
            else this.props.setAppLoaded(); // Close the splash screen if a token isn't found.
          })
          .catch(() => {
            this.props.setAppLoaded();
          });
          */
      });
  }

  loading = () => {
    return (
      <View style={styles.splash}>
        <Image source={require('../assets/splash.png')} style={{ width: wp('100%'), height: hp('100%'), resizeMode: 'contain' }} />
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
  setFontsLoaded, setAppLoaded, signInOnStart,
})(AppContainer);
