import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

let middleware = [thunk];
middleware = [...middleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));
let persistor = persistStore(store);

export { store, persistor };
