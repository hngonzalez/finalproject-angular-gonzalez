import { ILoginState, initialLoginState, initialLogoutState, ILogoutState } from './states/login.state';
/* import { initialPersonsState, IPersonsState } from './states/person.state'; */


export interface IAppState {
    login: ILoginState,
    logout: ILogoutState,
    /* persons: IPersonsState */
}

export const initialAppState: IAppState = {
    login: initialLoginState,
    logout: initialLogoutState,
    /* persons: initialPersonsState  */
}
