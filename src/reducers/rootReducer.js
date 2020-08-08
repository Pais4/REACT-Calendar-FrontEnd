/* EL ROOT REDUCER ES LA COMBINACION DE TODOS MIS REDUCERS */

import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import { calendarReducer } from "./calendarReducer";

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
})