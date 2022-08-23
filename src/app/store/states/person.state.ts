import { Person } from 'src/app/features/models/person.model';

export interface IPersonsState {
    persons: Person[],
    selectedPerson: Person,
    loading: boolean,
    loaded: boolean,
    error: Error
}

/* export const  initialPersonsState: IPersonsState = {
    error: null,
    loading: false,
    loaded: false,
    selectedPerson: null,
    persons: [] 
} */