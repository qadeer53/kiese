import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import opportunityReducer from "./opportunityReducer";
import contactReducer from "./contactReducer";
import accountReducer from "./accountReducer";
import authReducer from "./authReducer";
import authUserReducer from "./authUserReducer";

const rootReducer = combineReducers({
  project: projectReducer,
  opportunity: opportunityReducer,
  contact: contactReducer,
  account: accountReducer,
  auth: authReducer,
  authUser: authUserReducer,
});
export default rootReducer;
