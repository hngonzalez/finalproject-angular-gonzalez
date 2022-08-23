import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  curView?: string;
  curPerson!: Person;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.curPerson = this._authService.curPerson;
  }

  onCHangeView(tab: string) {
    this.curView = tab;
  }

  onLogout() {
    this._authService.logout()
  }

}
