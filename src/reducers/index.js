import { combineReducers } from "redux";
import theme from "./theme";
import query from "./query";

const allReducers = combineReducers({ theme, query });

export default allReducers;
