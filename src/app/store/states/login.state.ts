import { Person } from 'src/app/features/models/person.model';

export interface ILoginState {
    person: Person | null,
    token: string | null,
    loading: boolean
}

export const initialLoginState: ILoginState = {
    person: null,
    token: null,
    loading: false 
}

export interface ILogoutState {
    loading: boolean 
}

export const initialLogoutState: ILogoutState = {
    loading: false 
}