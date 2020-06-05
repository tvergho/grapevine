/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppContainer from './components/app-container';
import reducers from './reducers';

console.disableYellowBox = true;
const store = createStore(reducers);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
