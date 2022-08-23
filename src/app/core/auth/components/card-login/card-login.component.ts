import { LOGIN_SELECTORS } from './../../../../store/selectors/login.selectors';
import { Observable } from 'rxjs';
import { LOGIN_ACTIONS } from './../../../../store/actions/login.actions';
import { User } from './../../models/user';
import { DataService } from './../../../../features/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
/* import { Person } from 'src/app/features/models/person.model'; */
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card-login',
  templateUrl: './card-login.component.html',
  styleUrls: ['./card-login.component.css']
})
export class CardLoginComponent implements OnInit {
  loading: boolean = false;
  /* loading$: Observable<boolean> = this.store.select(LOGIN_SELECTORS.selectGetPerson); */
  loading$: Observable<boolean> = this.store.select(LOGIN_SELECTORS.selectGetLoginLoading);
  exists: boolean = true;
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private _authService:AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.store.dispatch(LOGIN_ACTIONS.login.run({
      user: this.username,
      password: this.password
    }));

    /* this.loading = true;
    this.exists = true;
    
    setTimeout(() => {
      this.loading = false;
      this._authService.login()
      .subscribe((resp: Person[]) => {
        resp.forEach(element => {
          if (element.username == this.username && element.password == this.password) {
            localStorage.setItem('token', 'asdadadas');          
            this.router.navigate(['./']);
          }
        })
      }, error => {
        this.exists = false;
      })
    }, 2000); */
  }
}
