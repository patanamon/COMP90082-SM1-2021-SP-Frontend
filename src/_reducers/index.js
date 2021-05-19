import { combineReducers } from "redux";
import { user } from "./user.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
});

export default persistReducer(persistConfig, rootReducer);
