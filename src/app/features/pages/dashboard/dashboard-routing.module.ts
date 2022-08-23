import { InscriptionsComponent } from './../inscriptions/inscriptions.component';
import { StudentsComponent } from './../students/students.component';
import { ListComponent } from './../../components/list/list.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';

const routes: Routes = [
  {  
    path:'', 
    children: [
      { 
        path: '',
        component: DashboardComponent
      },
      { 
        path: 'students',
        component: StudentsComponent
      },
      { 
        path: 'courses',
        component: CoursesComponent
      },
      { 
        path: 'inscriptions',
        component: InscriptionsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
