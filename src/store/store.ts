import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import modalReducer from "./modalSlice";
const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
