/* import { PERSONS_ACTIONS } from './../actions/person.actions';
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
export class PersonsEffectsService {
    personAux: Person = new Person();

    constructor(
        private actions$: Actions,
        private _dataService: DataService
    ) { }

    personsEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PERSONS_ACTIONS.load.run),
            delay(1000),
            mergeMap((_) => {
                return this._dataService.getStudents().pipe(
                    map((persons) => {
                        return persons ? PERSONS_ACTIONS.load.success({ persons }) : emptyAction();
                    }),
                    catchError(() => {
                        return EMPTY
                    })
                )
            })
        )
    })

    personsSuccessEffects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PERSONS_ACTIONS.load.success),
            map((persons) => {
                return emptyAction()
            })
        )
    })
} */