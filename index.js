/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
// import {store, persistor} from './files/redux/store';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

const AppRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   // navigationRef.navigate('Home');
// });
AppRegistry.registerComponent(appName, () => AppRedux);
