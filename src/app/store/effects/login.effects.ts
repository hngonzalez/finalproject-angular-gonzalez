import { DataService } from 'src/app/features/services/data.service';
import { emptyAction } from './../app.reducer';
import { Router } from '@angular/router';
import { Person } from 'src/app/features/models/person.model';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from './../actions/login.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, delay, switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginEffectsService {
    personAux: Person = new Person();

    constructor(
        private actions$: Actions,
        private _loginService: AuthService,
        private _dataService: DataService,
        private router: Router
    ) { }

    loginEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.login.run),
            delay(1000),
            mergeMap((action) => {
                return this._dataService.getUsersLogin(action.user, action.password).pipe(
                    map((person) => {
                        return person ? LOGIN_ACTIONS.login.success({ person, token: 'asdasdasdasdasdasdasdadsads' }) : LOGIN_ACTIONS.login.failed()
                    }),
                    catchError(() => {
                        return EMPTY
                    })
                )
            })
        )
    })

    loginSuccessEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.login.success),
            map(({token}) => {
                localStorage.setItem('token', token);          
                this.router.navigate(['./']);
                return emptyAction()
            })
        )
    })

    loginFailedEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_ACTIONS.login.failed),
            map((_) => {
                return emptyAction()
            })
        )
    })

    logoutEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGOUT_ACTIONS.logout.run),
            delay(1000),
            map((_) => {
                return LOGOUT_ACTIONS.logout.success();
            })
        )
    })

    logoutSuccessEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGOUT_ACTIONS.logout.success),
            map(() => {
                localStorage.removeItem('token');          
                this.router.navigate(['./login']);
                return emptyAction()
            })
        )
    })
}