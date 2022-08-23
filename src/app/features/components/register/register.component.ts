import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../../models/classroom';
import { Course } from '../../models/course';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() curView?: string;
  @Input() dataCourses?: Course[];
  @Input() dataClassrooms?: Classroom[];

  constructor() { }

  ngOnInit(): void {
  }

}
