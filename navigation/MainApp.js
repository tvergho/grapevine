import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen, FeedScreen, CreateRec, ProfileScreen, FriendsScreen, FriendRequests, Business, AddFriendScreen, DetailScreen, PaymentScreen, YourRecsScreen,
} from 'screens';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedModalNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FeedScreen" mode="modal">
      <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateRec" component={CreateRec} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const FriendNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Friends">
      <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FriendRequests" component={FriendRequests} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const FeedNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={FeedModalNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const HomeModal = () => {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeModal} options={{ headerShown: false }} />
      <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="modal">
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Friends" component={FriendNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="YourRecs" component={YourRecsScreen} options={{ headerShown: false }} />
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
        component={ProfileNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="user" type="font-awesome" color={color} size={size} />) }}
      />
    </Tab.Navigator>
  );
};

export default MainApp;
