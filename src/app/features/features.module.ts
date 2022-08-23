import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../modules/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { ViewStudentCoursesModalComponent } from './components/view-student-courses-modal/view-student-courses-modal.component';



@NgModule({
  declarations: [
    FeaturesComponent,
    ViewStudentCoursesModalComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class FeaturesModule { }
