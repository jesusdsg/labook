import { Component, OnInit } from '@angular/core';
import { UsersComponent } from '../functions/users/users.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sidebarToggle: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    if (this.sidebarToggle) {
      this.sidebarToggle = false;
    }else {
      this.sidebarToggle = true;
      console.log('toggled');
    }
  }

}
