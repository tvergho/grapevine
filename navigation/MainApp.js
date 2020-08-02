import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen, RecsScreen, CreateRec, ProfileScreen, FriendsScreen, FriendRequests, Business, AddFriendScreen, DetailScreen, PaymentScreen, YourRecsScreen, FeedScreen,
} from 'screens';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FriendNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Friends">
      <Stack.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FriendRequests" component={FriendRequests} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const RecsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Recs">
      <Stack.Screen name="Recs" component={RecsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Business" component={Business} options={{ headerShown: false }} />
    </Stack.Navigator>
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

const YourRecsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="YourRecsScreen">
      <Stack.Screen name="YourRecsScreen" component={YourRecsScreen} options={{ headerShown: false }} />
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
      <Stack.Screen name="YourRecs" component={YourRecsNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const Placeholder = () => {
  return <View style={{ display: 'flex', backgroundColor: 'white' }} />;
};

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{ activeTintColor: '#FFB7B2', inactiveTintColor: '#979797', showLabel: false }}>
      <Tab.Screen name="Recs"
        component={RecsNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="thumbs-up" type="font-awesome" color={color} size={size} />) }}
      />
      <Tab.Screen name="Feed"
        component={FeedNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="bullhorn" type="font-awesome" color={color} size={size} />) }}
      />
      <Tab.Screen name="Create"
        component={Placeholder}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="plus-square" type="font-awesome" color={color} size={size} />) }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('CreateRec');
          },
        })}
      />
      <Tab.Screen name="Home"
        component={HomeNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="map-marker" type="font-awesome" color={color} size={size + 3} />) }}
      />

      <Tab.Screen name="Profile"
        component={ProfileNavigator}
        options={{ tabBarIcon: ({ color, size }) => (<Icon name="user" type="font-awesome" color={color} size={size} />) }}
      />
    </Tab.Navigator>
  );
};

const MainAppWrapper = () => {
  return (
    <Stack.Navigator initialRouteName="MainApp" mode="modal">
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
      <Stack.Screen name="CreateRec" component={CreateRec} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainAppWrapper;
