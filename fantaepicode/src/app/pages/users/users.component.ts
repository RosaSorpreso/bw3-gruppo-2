import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { iUser } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: iUser[] = []

  constructor(private usrSvc: UserService){}

  ngOnInit(){
    this.usrSvc.getAllUsers();
    this.usrSvc.users$.subscribe(users => {
      this.users = users;
    });
  }
}
