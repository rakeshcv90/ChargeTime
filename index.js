/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
// import {store, persistor} from './files/redux/store';
import { store,persistor } from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const AppRedux = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  };
AppRegistry.registerComponent(appName, () => AppRedux);
