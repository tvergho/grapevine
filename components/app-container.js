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
import { setFontsLoaded } from '../actions';
import SignUp from './sign-up';
import SignUpStep from './sign-up-step';
import FeedScreen from './feed-screen';
import HomeScreen from './home-screen';
import ProfileScreen from './profile-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogoHeader = () => {
  return (
    <Image source={require('../assets/recroom_header.png')} style={{ height: 80, resizeMode: 'contain' }} />
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

    this.state = {
      fontsLoaded: false,
    };
  }

  componentDidMount() {
    Font.loadAsync({
      'Hiragino W0': require('../assets/fonts/Hiragino-W0.otf'),
      'Hiragino W1': require('../assets/fonts/Hiragino-W1.otf'),
      'Hiragino W2': require('../assets/fonts/Hiragino-W2.otf'),
      'Hiragino W3': require('../assets/fonts/Hiragino-W3.otf'),
      'Hiragino W4': require('../assets/fonts/Hiragino-W4.otf'),
      'Hiragino W5': require('../assets/fonts/Hiragino-W5.otf'),
      'Hiragino W6': require('../assets/fonts/Hiragino-W6.otf'),
      'Hiragino W7': require('../assets/fonts/Hiragino-W7.otf'),
      'Hiragino W8': require('../assets/fonts/Hiragino-W8.otf'),
      'Hiragino W9': require('../assets/fonts/Hiragino-W9.otf'),
    })
      .then((result) => {
        this.setState({ fontsLoaded: true });
        this.props.setFontsLoaded();
      })
      .catch((error) => {
        this.setState({ fontsLoaded: true });
        console.log(error.message);
      });
  }

  loading = () => {
    return (
      <View style={styles.splash} />
    );
  }

  render() {
    return (
      this.state.fontsLoaded
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
  }
);

export default connect(mapStateToProps, { setFontsLoaded })(AppContainer);
