import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counter.slice";
import cartSlice from "./features/cart/cart.slice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  cart: cartSlice.reducer,
});

const persistedState = localStorage.getItem("reduxState")!
  ? JSON.parse(localStorage.getItem("reduxState")!)
  : null;

let preloadedState = null;

if (persistedState) {
  preloadedState = persistedState;
}

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
