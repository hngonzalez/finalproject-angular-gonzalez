import { ILoginState } from './../states/login.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectLoginState = createFeatureSelector<ILoginState>('login');
const selectGetPerson = createSelector(selectLoginState, (state) => state.person);
const selectGetLoginLoading = createSelector(selectLoginState, (state) => state.loading);
 
export const LOGIN_SELECTORS = {
    selectGetPerson,
    selectGetLoginLoading
}