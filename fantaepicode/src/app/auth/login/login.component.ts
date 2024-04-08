import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { iLogin } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login:iLogin = {
    email: '',
    password: ''
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

    signIn(){
      this.authSvc.login(this.login)
      .subscribe(data => {
        this.router.navigate(['/homepage'])
      })
    }
}
