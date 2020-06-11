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
import * as SecureStore from 'expo-secure-store';
import { setFontsLoaded, setAppLoaded, tryFacebookSignInOnStart } from '../actions';
import SignUp from './sign-up';
import SignUpStep from './sign-up-step';
import FeedScreen from './feed-screen';
import HomeScreen from './home-screen';
import ProfileScreen from './profile-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoHeader = () => {
  return (
    <Image source={require('../assets/recroom_header.png')} style={{ minHeight: 80, width: wp('100%'), resizeMode: 'contain' }} />
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: '#FFB7B2' }}>
      <Tab.Screen name="Feed"
        component={FeedScreen}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="bullhorn" type="font-awesome" color={color} size={size} />) }}
      />
      <Tab.Screen name="Home"
        component={HomeScreen}
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
        SecureStore.getItemAsync('fbtoken')
          .then((token) => {
            if (token) this.props.tryFacebookSignInOnStart(token);
            else this.props.setAppLoaded();
          })
          .catch(() => {
            this.props.setAppLoaded();
          });
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

export default connect(mapStateToProps, { setFontsLoaded, setAppLoaded, tryFacebookSignInOnStart })(AppContainer);
