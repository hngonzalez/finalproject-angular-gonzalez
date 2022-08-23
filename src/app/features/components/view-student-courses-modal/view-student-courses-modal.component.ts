import { Course } from './../../models/course';
import { DataService } from 'src/app/features/services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-student-courses-modal',
  templateUrl: './view-student-courses-modal.component.html',
  styleUrls: ['./view-student-courses-modal.component.css']
})
export class ViewStudentCoursesModalComponent implements OnInit {
  currentStudentCourses?: Course[] = [];
  availableCourses?: Course[];
  selectedCourse?: Course;
  existCourse: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ViewStudentCoursesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.getStudentCourses();
  }

  getCourses() {
    this._dataService.getCourses()
    .subscribe((coursesList: Course[]) => {
      this.availableCourses = coursesList;
    }, error => {
    });
  }

  getStudentCourses() {
    this._dataService.getRelCoursePerson()
    .subscribe((rel: any[]) => {
      rel.forEach(element => {
        if (element.idPerson == this.data.elementRow) {
          this._dataService.getDataCoursesByCourseId(element.idCourse)
          .subscribe((resp: Course) => {
            if (resp) {
              this.currentStudentCourses!.push(resp);
            }
          },error => {

          });
        }

      })
    },error => {

    });
  }

  onCourseChange() {
    this.currentStudentCourses!.forEach(element => {
      if (element.idCourse == this.selectedCourse!.idCourse) {
        this.existCourse = true;
      }
    })

    if (!this.existCourse) {
      this._dataService.addNewCourseToStudent(this.selectedCourse!.idCourse!, this.data.elementRow)
      .subscribe((resp: any) => {
        this._dataService.getDataCoursesByCourseId(resp.idCourse)
        .subscribe((resp2: Course) => {
          this.currentStudentCourses!.push(resp2);
        },error => {

        });
      })
    }
  }
}
