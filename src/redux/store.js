// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer, { initialState } from './reducer';

// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // const store = configureStore({
// //   reducer: persistedReducer,
// // });
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     thunk: false,
//     immutableCheck: false,
//     serializableCheck: {
//       ignoredActions: [
//         'persist/PERSIST',
//         'persist/REHYDRATE',
//         'persist/PAUSE',
//         'persist/PURGE',
//         'persist/FLUSH',
//         'persist/REGISTER',
//       ],
//     },
//   }),
// });

// const persistor = persistStore(store);

// export { store, persistor };
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
