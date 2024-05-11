import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counter/counter.slice";
import cartSlice from "./features/cart/cart.slice";
import { persistedState } from "@/app/components/cart/Cart";

export const makeStore = () => {
  const rootReducer = combineReducers({
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
  });

  let preloadedState = null;

  if (persistedState) {
    preloadedState = persistedState;
  }

  const store = configureStore({
    reducer: rootReducer,
    ...(preloadedState ? { preloadedState } : {}),
  });

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
