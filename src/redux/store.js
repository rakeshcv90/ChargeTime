import {configureStore} from '@reduxjs/toolkit';
import rootReducer, { initialState } from './reducers';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from './constants';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  // preloadedState: initialState,
});
const persistor = persistStore(store)

export {store, persistor}


