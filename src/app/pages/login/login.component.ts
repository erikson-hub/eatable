import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('my_mail@mail.com'),
    password: new FormControl('123456'),
  });

  onSubmit(): void {
    console.log(this.loginForm.value);
    // const { email, password } = this.loginForm.value;
    // this.authService.login(email, password);
  }
}