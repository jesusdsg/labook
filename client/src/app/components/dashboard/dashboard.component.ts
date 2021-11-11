import { Component, OnInit } from '@angular/core';
import { UsersComponent } from '../functions/users/users.component';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sidebarToggle: boolean = true;
  readerPanel: boolean = false;
  homePanel: boolean = true;


  @HostListener('window:resize', ['$event'])
  onResize() {
    window.innerWidth > 768 ? this.sidebarToggle = true : this.sidebarToggle = false;
  }

  constructor() {
   }

  ngOnInit(): void {
    this.homePanel = true;
  }




  showReaderPanel() {
    this.readerPanel = true;
    this.homePanel = false;
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
