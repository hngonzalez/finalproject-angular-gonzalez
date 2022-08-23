import { DataService } from './../../services/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _dataService: DataService
  ) { 
    this.studentForm = this.fb.group({
      idPerson: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }
 
  ngOnInit(): void {
    this.studentForm.setValue({
      idPerson: this.data.elementRow.idPerson,
      name: this.data.elementRow.name,
      lastName: this.data.elementRow.lastName,
      email: this.data.elementRow.email
    });
  }

  onSave() {
    let newStudent = new Person(
      this.studentForm.get('idPerson')!.value,
      this.studentForm.get('name')!.value,
      this.studentForm.get('lastName')!.value,
      this.studentForm.get('email')!.value,
    );

    this._dataService.updateStudent(newStudent)
    .subscribe( resp => {
      this.dialogRef.close(resp)
    }, error => {
      
    });
  }

}
