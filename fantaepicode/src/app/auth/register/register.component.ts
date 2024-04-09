import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iUser } from '../../models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData:Partial<iUser> = {}

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

    signUp(){
      this.authSvc.register(this.registerData)
      .subscribe(data => {
        this.router.navigate(['login'])
      })
    }
}
