import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/features/services/data.service';
import { Person } from 'src/app/features/models/person.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  curPerson!: Person;

  constructor(
    private router: Router,
    private _dataService: DataService
  ) { }

  login() {
    return this._dataService.getUsers();
  }

  login2(username: string, password: string) {
    return this._dataService.getUsers2(username, password).pipe(map((users) => 
      users.find(user => user.username == username && user.password == password) || null
    ), catchError((error) => {
      throw new Error();
    }));
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['login']);
  }
}
