import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLight: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleTheme(): void {
    if (this.isLight) {
      this.isLight = false;
      console.log('Dark theme')
    } else {
      this.isLight = true;
      console.log('Light theme')
    }
  }

}
