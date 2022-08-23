import { LOGOUT_ACTIONS } from './../store/actions/login.actions';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.store.dispatch(LOGOUT_ACTIONS.logout.run());
    /* this._authService.logout() */
  }
}
