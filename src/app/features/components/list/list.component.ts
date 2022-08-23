import { Store } from '@ngrx/store';
import { AuthService } from './../../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { EditStudentComponent } from './../edit-student/edit-student.component';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../../models/person.model';
import { DataService } from '../../services/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCoursesComponent } from '../edit-courses/edit-courses.component';
import { NewStudentComponent } from '../new-student/new-student.component';
import { ViewStudentCoursesModalComponent } from '../view-student-courses-modal/view-student-courses-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  @Input() filter?: string;
  dataPersonsList?: Person[];
  dataPersonsList$?: Subscription;
  studentsList?: Person[];
  curUser?: string;
  confirmation: boolean = false;
  
  displayedColumns: string[] = ['idPerson', 'name', 'lastName', 'email', 'curso', 'actions'];
  
  constructor(
    private _dataService: DataService,
    private _dataAuth: AuthService,
    public dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.confirmation = false;
    this.curUser = localStorage.getItem('type')!
    this.dataPersonsList$ = this._dataService.getStudents()
    .subscribe((studentList:Person[]) => {
      this.dataPersonsList = studentList;
    }, error => {
      
    });
  }

  ngOnDestroy(): void {
      this.dataPersonsList$!.unsubscribe();
  }

  /**
   * Función para abrir el modal de cursos del estudiante seleccionado
   * @param elementRow elemento a modificar
   */
  openCourses(elementRow: any) {
    const dialogRef = this.dialog.open(ViewStudentCoursesModalComponent, {
      width: '50%',
      height: '80%',
      data: {elementRow},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Función para editar estudiante
   * @param elementRow elemento a modificar
   */
  editStudent(elementRow: any) {
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '20%',
      data: {elementRow},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let indexToUpdate = this.dataPersonsList!.findIndex((studentAux: Person) => {
          return studentAux.idPerson == result.idPerson;
        });
  
        this.dataPersonsList![indexToUpdate] = result;
      }
    });
  }

  deleteStudent(student: Person) {
    this._dataService.deleteStudent(student)
    .subscribe( resp => {
      let indexToDelete = this.dataPersonsList!.findIndex((studentAux: Person) => {
        return studentAux.idPerson == student.idPerson;
      });

      this.dataPersonsList!.splice(indexToDelete, 1);
    }, error => {
      
    });
  }
  
}
