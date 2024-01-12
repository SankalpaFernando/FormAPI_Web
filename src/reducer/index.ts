import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from "redux-thunk";
import projectSlice from "./projectSlice";
import collectionSlice from "./collectionSlice";

const store = configureStore({
  reducer:{
    auth: persistReducer({key:'root',storage},authSlice),
    project:  persistReducer({key:'project_root',storage},projectSlice),
    collection: collectionSlice,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store;