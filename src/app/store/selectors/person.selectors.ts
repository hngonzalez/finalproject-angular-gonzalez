/* import { IPersonsState } from './../states/person.state';
import { ILoginState } from './../states/login.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectPersonsState = createFeatureSelector<IPersonsState>('Persons');
const selectGetPersons = createSelector(selectPersonsState, (state) => state.persons);
const selectGetPersonsLoading = createSelector(selectPersonsState, (state) => state.loading);
const selectGetPersonsLoaded = createSelector(selectPersonsState, (state) => state.loaded);

export const PERSONS_SELECTORS = {
    selectGetPersons,
    selectGetPersonsLoaded,
    selectGetPersonsLoading
} */