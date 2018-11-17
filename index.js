import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider, connect } from 'react-redux';
import App from './App';
import configureStore from './src/store/configureStore';

// store is an object that brings actions and reducers toghter 
// only single store should exist in the app.
const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);



AppRegistry.registerComponent('WaterApp', () => RNRedux);

