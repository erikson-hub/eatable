import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Credentials } from '../../models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('mari@mail.com'),
    password: new FormControl('maribella'),
  });

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.signin(<Credentials>this.loginForm.value);
  }
}
