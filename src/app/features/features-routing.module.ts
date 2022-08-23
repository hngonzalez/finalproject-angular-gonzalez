import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsComponent } from './pages/inscriptions/inscriptions.component';
import { StudentsComponent } from './pages/students/students.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  { 
    path: '',
    component: FeaturesComponent,
    children: [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
