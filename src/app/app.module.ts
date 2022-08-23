import { EffectsModule } from '@ngrx/effects';
/* import { PersonsEffectsService } from './store/effects/person.effects'; */
/* import { PersonsReducer } from './store/reducers/person.reducer'; */
import { LoginEffectsService } from './store/effects/login.effects';
import { MaterialModule } from './modules/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { ListComponent } from './features/components/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './features/components/register/register.component';
import { NewStudentComponent } from './features/components/new-student/new-student.component';
import { NewCourseComponent } from './features/components/new-course/new-course.component';
import { NewClassroomComponent } from './features/components/new-classroom/new-classroom.component';
import { EditCoursesComponent } from './features/components/edit-courses/edit-courses.component';
import { EditStudentComponent } from './features/components/edit-student/edit-student.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { AuthComponent } from './core/auth/auth.component';
import { CardLoginComponent } from './core/auth/components/card-login/card-login.component';
import { CoursesComponent } from './features/pages/courses/courses.component';
import { StudentsComponent } from './features/pages/students/students.component';
import { InscriptionsComponent } from './features/pages/inscriptions/inscriptions.component';
import { ListCoursesComponent } from './features/components/list-courses/list-courses.component';
import { DetailsCourseComponent } from './features/components/details-course/details-course.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListComponent,
    RegisterComponent,
    NewStudentComponent,
    NewCourseComponent,
    NewClassroomComponent,
    EditCoursesComponent,
    EditStudentComponent,
    NotFoundComponent,
    AuthComponent,
    CardLoginComponent,
    CoursesComponent,
    StudentsComponent,
    InscriptionsComponent,
    ListCoursesComponent,
    DetailsCourseComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([LoginEffectsService]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
