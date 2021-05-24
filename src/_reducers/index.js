import { combineReducers } from "redux";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { user } from "./user.reducer";
import { alert } from "./alert.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  authentication,
  registration,
  user,
  alert,
});

export default persistReducer(persistConfig, rootReducer);
