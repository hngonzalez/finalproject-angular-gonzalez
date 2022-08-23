/* import { IPersonsState } from './../states/person.state';
import { PERSONS_ACTIONS } from './../actions/person.actions';
import { initialLogoutState } from './../states/login.state';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from './../actions/login.actions';
import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { initialLoginState } from "../states/login.state";
import { initialPersonsState } from '../states/person.state';

export const PersonsReducer = createReducer(
    initialPersonsState,
    on(PERSONS_ACTIONS.load.run, (state) => {
        return {
            ...state, 
            loading: true
        }
    }),
    on(PERSONS_ACTIONS.load.success, (state, {persons}) => {
        return {
            ...state, 
            loading: false,
            loaded: true,
            persons
        }
    }),
    on(PERSONS_ACTIONS.load.failed, (state) => {
        return {
            ...state, 
            loading: false,
        }
    }),
)
 */