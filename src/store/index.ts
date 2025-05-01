import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import createSagaMiddleware from "redux-saga";
import { customerSlice } from "../features/customer/slice";
import { customerSagas } from "../features/customer/sagas";
import { PERSIST_KEY, PERSIST_VERSION } from "../constants/store";
import { all, spawn } from "redux-saga/effects";
import {
  persistReducer,
  persistStore,
  PAUSE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  PURGE,
  FLUSH,
} from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: PERSIST_KEY,
  version: PERSIST_VERSION,
  storage,
  whitelist: ["customer"],
};

const rootReducers = combineReducers({
  customer: customerSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([spawn(customerSagas)]);
}

sagaMiddleware.run(rootSaga);

export type Store = typeof store;
export type AppState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
