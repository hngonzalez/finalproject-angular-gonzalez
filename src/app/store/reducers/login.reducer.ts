import { initialLogoutState } from './../states/login.state';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from './../actions/login.actions';
import { createReducer, on } from "@ngrx/store";
import { initialLoginState } from "../states/login.state";

export const LoginReducer = createReducer(
    initialLoginState,
    on(LOGIN_ACTIONS.login.run, (state) => {
        return {
            ...state, 
            loading: true
        }
    }),
    on(LOGIN_ACTIONS.login.success, (state, {person, token}) => {
        return {
            ...state, 
            loading: false,
            person,
            token
        }
    }),
    on(LOGIN_ACTIONS.login.failed, (state) => {
        return {
            ...state,
            loading: false,
        }
    })
)

export const LogoutReducer = createReducer(
    initialLogoutState,
    on(LOGOUT_ACTIONS.logout.run, (state) => {
        return {
            ...state, 
            loading: true
        }
    }),
    on(LOGOUT_ACTIONS.logout.success, (state) => {
        return {
            ...state, 
            loading: false
        }
    }),
)