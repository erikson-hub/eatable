import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../models/new-user.model';
import { Profile } from '../models/profile.model';
import { Login } from '../models/login.model';

interface currentUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUri = 'http://localhost:8000/api';

  currentUser!: currentUser | null;

  constructor(private router: Router, private http: HttpClient) {}

  // private get _profile(): string {
  //   return sessionStorage.getItem('id') || '';
  // }
  // private set _profile(id: string) {
  //   sessionStorage.setItem('id', id);
  // }

  login(login: Login) {
    this.http.post(`${this.apiUri}/login`, login).subscribe((data: any) => {
      if (data.token) {
        console.log(data);
        sessionStorage.setItem('id', data.token);
        sessionStorage.setItem('email', data.token);
        sessionStorage.setItem('token', data.token);
        // this.router.navigate(['/home']);
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  // signup(newUser: NewUser): void {
  //   this.http.post<Profile>(`${this.apiUri}/signup`, newUser).subscribe(
  //     (data: Profile) => {
  //       if (data.token) {
  //         // entramos aqui solo si
  //         // el usuario se logeo
  //         // correctamente.
  //         alert('Te has registrado correctamente.');
  //         sessionStorage.setItem('token', data.token);
  //         this.router.navigate(['/dashboard/categories']);
  //       }
  //     },
  //     (err) => {
  //       alert('Este usuario ya existe.');
  //     }
  //   );
  // }
}
