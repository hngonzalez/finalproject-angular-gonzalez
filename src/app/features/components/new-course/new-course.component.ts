import { Classroom } from './../../models/classroom';
import { Course } from './../../models/course';
import { DataService } from './../../services/data.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  courseForm!: FormGroup;
  availableCourses?: Course[];
  availableClassrooms?: Classroom[];
  classroom?: Classroom;
  selected?: number;
  arCourses: number[] = [];
  saved: boolean = true;
  course!: Course;
  newCourse: string = '';
  
  @Output() evtCorse: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.availableClassrooms = this._dataService.getClassrooms();
    this.courseForm = this.fb.group({
      idCourse: new FormControl(""),
      name: new FormControl("", [Validators.required])
    })
  }

  onChange() {
    
    this.courseForm.setValue({
      idCourse: this.course.idCourse,
      name: this.course.name,
      idClassroom: this.course.idClassroom
    });
  }

  onChangeClassroom() {
    this.courseForm.setValue({
      idCourse: 0,
      name: this.courseForm.get('name')!.value,
      idClassroom: this.classroom!.idClassroom
    });
  }

  selectionCourse(type: string) {
    this.newCourse = type;
    this.courseForm.reset();
  }

  
  onSave() {
    this.saved = false;
    let newCourse = new Course(undefined, this.courseForm.get('name')!.value, undefined);
    this._dataService.addCourse(newCourse)
    .subscribe(resp => {
      this.evtCorse.emit(resp)
    },error => {
      
    });
    setTimeout(() => {
      this.saved = true;
    }, 1500);
  }
}
