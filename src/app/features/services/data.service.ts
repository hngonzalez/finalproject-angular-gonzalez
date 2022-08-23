import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Classroom } from './../models/classroom';
import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataPersonsList: Person[] = [
    {idPerson: 1, username: 'fgonzalez', password:'admin', name: 'Franco', lastName: 'Gonzalez', type:'student', email: 'Franco@outlook.com', courses: [{idCourse: 1, name: 'Análisis Matemático', idClassroom: 1},{idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}]},
    {idPerson: 2, username: 'mgonzalez', password:'admin', name: 'Matias', lastName: 'Gonzalez', type:'student', email: 'Matias@outlook.com', courses: [{idCourse: 1, name: 'Análisis Matemático', idClassroom: 1},{idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}]},
    {idPerson: 3, username: 'frgonzalez', password:'admin', name: 'Franco', lastName: 'Gonzalez', type:'student', email: 'Franco@outlook.com', courses: []},
    {idPerson: 4, username: 'lgonzalez', password:'admin', name: 'Laura', lastName: 'Gonzalez', type:'student', email: 'Laura@outlook.com', courses: [{idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}]},
    {idPerson: 5, username: 'admin', password:'admin', name: 'Miguel', lastName: 'Apellidito', type:'admin', email: 'Miguel@outlook.com', courses: []},
    {idPerson: 6, username: 'user', password:'user', name: 'Joaquin', lastName: 'Algo', type:'user', email: 'Joaquin@outlook.com', courses: []},
    {idPerson: 7, username: 'npipez', password:'admin', name: 'Nombrecito', lastName: 'Pipez', type:'user', email: 'Nombrecito@outlook.com', courses: []},
    {idPerson: 8, username: 'puerpowi', password:'admin', name: 'Paula', lastName: 'Uerpowi', type:'user', email: 'Paula@outlook.com', courses: []},
  ];
  dataCourses: Course[] = [
    {idCourse: 1, name: 'Análisis Matemático', idClassroom: 1},
    {idCourse: 2, name: 'Organización Empresarial', idClassroom: 2}
  ]
  dataClassrooms: Classroom[] = [
    {idClassroom: 1, name: 'Aula B254'},
    {idClassroom: 2, name: 'Aula A361'},
    {idClassroom: 3, name: 'Aula C255'},
  ]

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.urlApi + 'person');
  }

  getUsers2(username: string, password: string): Observable<Person[]> {
    return this.http.get<Person[]>(environment.urlApi + 'person').pipe(
      map((persons) => {
        return persons
      }),
      catchError((error) => {
        throw new Error(); 
      })
    );
  }

  getUsersLogin(username: string, password: string): Observable<Person | null> {
    return this.http.get<Person[]>(environment.urlApi + 'person').pipe(
      map((persons) => {
        return persons.find(person => person.username == username && person.password == password) || null
      }),
      catchError((error) => {
        throw new Error(); 
      })
    );
  }

  getStudents(): Observable<Person[]> {
    return this.http.get<Person[]>(environment.urlApi + 'person');
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(environment.urlApi + 'course');
  }

  getClassrooms(): Classroom[] {
    return this.dataClassrooms;
  }

  getRelCoursePerson(): Observable<any[]> {
    return this.http.get<any[]>(environment.urlApi + 'rel-course-person');
  }

  getStudentById(idPerson: number):  Observable<Person> {
    return this.http.get<Person>(environment.urlApi + 'person/' + idPerson);
  }

  getStudentsByCourseId(idCourse: number) {
    var arStudents:any = [];
    this.http.get(environment.urlApi + 'rel-course-person')
    .subscribe((rel:any) => {
      rel.forEach((element:any) => {
        if (element.idCourse == idCourse) {
          this.getStudentById(element.idPerson)
          .subscribe((person: Person) => {
            arStudents.push(person);
          }) 
        }
      });
    });

    return of(arStudents);
  }

  getDataCoursesById(course: Course): Observable<Course> {
    return this.http.get<Course>(environment.urlApi + 'course/' + course.idCourse);
  }

  getDataCoursesByCourseId(idCourse: number): Observable<Course> {
    return this.http.get<Course>(environment.urlApi + 'course/' + idCourse);
  }

  addStudent(student: Person): void {
    var curCourses = student.courses;
    student.courses = [];

    this.http.post(environment.urlApi + 'person/', student)
    .subscribe((resp: Person) => {
      resp.courses = curCourses;
      this.addRelCourseStudent(resp);
    },error => {
      
    });
  }

  addRelCourseStudent(resp: Person) {
    var obj = {};
    
    resp.courses!.forEach((course: Course) => {
      if (course.idCourse) {
        
        obj = {
          "idCourse": <number>course.idCourse,
          "idPerson": resp.idPerson
        }
        this.http.post(environment.urlApi + 'rel-course-person', obj)
        .subscribe(resp2 => {
        }, error => {
        });
      }
    })
  }

  addNewCourseToStudent(idCourse: number, idPerson: number) {
    var obj = {};
    
    obj = {
      "idCourse": idCourse,
      "idPerson": idPerson
    }

    return this.http.post(environment.urlApi + 'rel-course-person', obj)
  }

  addClassroomToStudent(idPerson: number, course: Course) {
    let indexToEdit = this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == idPerson;
    })

    this.dataPersonsList[indexToEdit].courses!.push(course);
  }

  /**
   * Función que agrega un nuevo curso a la lista
   * @param course nuevo curso a agregar
   */
  addCourse(course: Course) {
    return this.http.post<Course[]>(environment.urlApi + 'course/', course);
  }

  addClassroom(classroom: Classroom) {
    classroom.idClassroom = this.dataClassrooms.length + 1;
    
    this.dataClassrooms.push(classroom);
  }

  editStudent(student: Person) {
    let indexToEdit= this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == student.idPerson;
    })
  
    this.dataPersonsList[indexToEdit].name = student.name;
    this.dataPersonsList[indexToEdit].lastName = student.lastName;
    this.dataPersonsList[indexToEdit].email = student.email;
  }

  editCourse(course: Course) {
    let indexToEdit= this.dataCourses.findIndex((courseElement:Course) => {
      return courseElement.idCourse == course.idCourse;
    })
  
    this.dataCourses[indexToEdit].name = course.name;
  }

  editClassroom(classroom: Classroom) {
    let indexToEdit= this.dataClassrooms.findIndex((classroomElement: Classroom) => {
      return classroomElement.idClassroom == classroom.idClassroom;
    })
  
    this.dataClassrooms[indexToEdit].name = classroom.name;
  }

  updateStudent(student: Person) {
    return this.http.put(environment.urlApi + 'person/' + student.idPerson, student);
  }

  updateCourse(idCourse: number, courseName: string) {
    let course = new Course(idCourse, courseName, Math.random());

    return this.http.put(environment.urlApi + 'course/' + course.idCourse, course);
  }

  removeClassroom(idPerson: number, idCourse: number) {
    let indexClassToRemove = this.dataPersonsList.findIndex((person:Person) => {
      return person.idPerson == idPerson;
    })

    let indexClass2ToRemove = this.dataPersonsList[indexClassToRemove].courses!.findIndex((course: Course) => {
      return course.idCourse == idCourse;
    })

    this.dataPersonsList[indexClassToRemove].courses!.splice(indexClass2ToRemove,1);
  }

  deleteStudent(student: Person): Observable<Person> {
    return this.http.delete<Person>(environment.urlApi + 'person/' + student.idPerson);
  }

  deleteCourse(course: Course): Observable<Course> {
    return this.http.delete<Course>(environment.urlApi + 'course/' + course.idCourse);
  }

  deleteStudentFromCourse(idRel: number): Observable<any> {
    return this.http.delete<any>(environment.urlApi + 'rel-course-person/' + idRel);
  }
}
