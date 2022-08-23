/* import { PersonsReducer } from './reducers/person.reducer'; */
import { LoginReducer, LogoutReducer } from './reducers/login.reducer';
import { IAppState } from './app.state';
import { ActionReducerMap, createAction } from "@ngrx/store";
import { Action } from 'rxjs/internal/scheduler/Action';

export const appReducers: ActionReducerMap<IAppState> = {
    login: LoginReducer,
    logout: LogoutReducer,
    /* persons: PersonsReducer */
}

export const emptyAction = createAction('Acción Vacía'); //Necesario el texto en la action