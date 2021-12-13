import { Component, OnInit } from '@angular/core';
import { DataUser } from '../../interfaces/data-user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getDataUser()
  }

  dataUser!: DataUser;
  name!: string;
  lastname!: string;

  getDataUser(){
    this.dataUser = JSON.parse(localStorage.getItem('dataUserToken')!);
    this.name = this.dataUser.user.name.split(' ')[0];
    this.lastname = this.dataUser.user.lastname.split(' ')[0];
  }

}
