/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './components/app-container';
import reducers from './reducers';

console.disableYellowBox = true;
const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
