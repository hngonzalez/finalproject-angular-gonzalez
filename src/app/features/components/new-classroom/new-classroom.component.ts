import { Classroom } from './../../models/classroom';
import { DataService } from './../../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/course';

@Component({
  selector: 'app-new-classroom',
  templateUrl: './new-classroom.component.html',
  styleUrls: ['./new-classroom.component.css']
})
export class NewClassroomComponent implements OnInit {
  classroomForm!: FormGroup;
  availableClassroom?: Classroom[];
  selected?: number;
  arCourses: number[] = [];
  saved: boolean = true;
  classroom!: Classroom;
  newCourse: string = '';

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService
  ) { 
    this.classroomForm = this.fb.group({
      idClassroom: new FormControl(""),
      name: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.availableClassroom = this._dataService.getClassrooms();
    this.classroomForm = this.fb.group({
      idClassroom: new FormControl(""),
      name: new FormControl("", [Validators.required])
    })
  }

  onChange() {
    this.classroomForm.setValue({
      idClassroom: this.classroom.idClassroom,
      name: this.classroom.name
    });
  }

  selectionCourse(type: string) {
    this.newCourse = type;
    this.classroomForm.reset();
  }

  onSave(type: string) {
    switch (type) {
      case 'New':
        this.saved = false;
        let newClassroom = new Classroom(this.classroomForm.get('idClassroom')!.value, this.classroomForm.get('name')!.value);
        this._dataService.addClassroom(newClassroom);
        setTimeout(() => {
          this.saved = true;
        }, 1500);
        break;

      case 'Edit':
        this.saved = false;
        let editClassroom = new Classroom(this.classroomForm.get('idClassroom')!.value, this.classroomForm.get('name')!.value);
        this._dataService.editClassroom(editClassroom);
        setTimeout(() => {
          this.saved = true;
        }, 1500);
        break;

      default:
        break;
    }
  }

}
