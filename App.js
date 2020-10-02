/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from 'navigation/AppContainer';
import { TouchableOpacity } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationHandler from 'components/NotificationHandler';
import reducers from './reducers';

console.disableYellowBox = true;
const middleware = [thunk];
if (__DEV__) { // eslint-disable-line
  const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;
  middleware.push(createFlipperMiddleware());
}
const store = createStore(reducers, applyMiddleware(...middleware));

TouchableOpacity.defaultProps = { ...(TouchableOpacity.defaultProps || {}), delayPressIn: 0 };

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(remoteMessage);
});

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
      <NotificationHandler />
    </Provider>
  );
};

export default App;
