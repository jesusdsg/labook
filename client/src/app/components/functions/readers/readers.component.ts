import { Component, OnInit } from '@angular/core';
import { Readers } from 'src/app/models/readers.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.scss']
})
export class ReadersComponent implements OnInit {

  readers: Readers[] = [];


  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getReaders();
  }

  getReaders() {
    this.usersService.getReaders().subscribe(data => {
      this.readers = data;
    }), error => {
      console.error(error, 'Error');

    }
  }

}
