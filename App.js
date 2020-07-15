/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as SplashScreen from 'expo-splash-screen';
import AppContainer from 'navigation/AppContainer';
import reducers from './reducers';

console.disableYellowBox = true;
const middleware = [thunk];
if (__DEV__) { // eslint-disable-line
  const createFlipperMiddleware = require('rn-redux-middleware-flipper').default;
  middleware.push(createFlipperMiddleware());
}
const store = createStore(reducers, applyMiddleware(...middleware));

const App = () => {
  SplashScreen.preventAutoHideAsync();

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
