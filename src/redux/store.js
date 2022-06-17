import {configureStore} from '@reduxjs/toolkit';
import {coordSlice} from './coordReducersSlice';
const createDebugger = require('redux-flipper').default;

const configureCustomStore = () => {
  const store = configureStore({
    reducer: coordSlice,
    middleware: getDefaultMiddleware =>
      __DEV__
        ? getDefaultMiddleware({serializableCheck: false}).concat(
            createDebugger(),
          )
        : getDefaultMiddleware({
            serializableCheck: false,
          }),
  });
  return {store};
};

export const {store} = configureCustomStore();
