import { Person } from 'src/app/features/models/person.model';
import { createAction, props } from "@ngrx/store";

export const LOGIN_ACTIONS = {
    login: {
        run: createAction('[Login] iniciar sesión', props<{user: string, password: string}>()),
        success:  createAction('[Login] iniciar sesión success', props<{person: Person, token: string}>()),
        failed: createAction('[Login] iniciar sesión failed')
    }
}

export const LOGOUT_ACTIONS = {
    logout: {
        run: createAction('[Logout] logout session'),
        success: createAction('[Logout] logout session success'),
        failed: createAction('[Logout] logout session failed', props<{error: Error}>()),
    }
}