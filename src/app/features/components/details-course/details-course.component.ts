import { Subscription } from 'rxjs';
import { Course } from './../../models/course';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../../models/person.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.css']
})
export class DetailsCourseComponent implements OnInit {
  curCourse!: Course;
  curStudents!: Person[];
  curStudents$: Subscription = new Subscription;

  constructor(
    public dialogRef: MatDialogRef<DetailsCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.curCourse = this.data.elementRow;
    this.curStudents$ = this._dataService.getStudentsByCourseId(this.curCourse.idCourse!)
    .subscribe((resp) => {
      this.curStudents = resp;
    });
  }

  onDelete(idCourse: number, idPerson: number) {
    this._dataService.getRelCoursePerson().subscribe( resp =>{
      resp.forEach(element => {
        if (element.idCourse == idCourse && element.idPerson == idPerson) {
          this._dataService.deleteStudentFromCourse(element.id).subscribe( resp2 => {
            var index = this.curStudents.findIndex((person: Person) => {
              return person.idPerson == idPerson
            })
            this.curStudents.splice(index, 1);
          });
        }
      });
    })
  }
}
