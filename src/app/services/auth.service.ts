import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "../models/credentials.model";
import { Profile } from "../models/profile.model";
import { Login } from "../models/login.model";

interface currentUser {
   email: string;
   password: string;
}

@Injectable({
   providedIn: "root",
})
export class AuthService {
   private API_URL = "http://localhost:8000/api";

   get user(): any {
      return {
         id: sessionStorage.getItem("id"),
         email: sessionStorage.getItem("email"),
         token: sessionStorage.getItem("token"),
      };
   }
   set user(user: any) {
      sessionStorage.setItem("id", user.id);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("token", user.token);
   }

   constructor(private router: Router, private http: HttpClient) {}

   signup(credentials: Credentials): void {
      this.http.post(`${this.API_URL}/users`, credentials).subscribe(
         (data: any) => {
            // console.log(data);
            if (data._id) {
               alert("Te has registrado correctamente.");
               this.signin(credentials);
            }
         },
         (err) => {
            alert("Este usuario ya existe.");
         }
      );
   }

   signin(credentials: Credentials): void {
      this.http
         .post(`${this.API_URL}/login`, credentials)
         .subscribe((data: any) => {
            if (data.token) {
               // console.log(data);
               this.user = data;
               this.router.navigate(["/"]);
            }
         });
   }

   signout() {
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(["/login"]);
   }

   isLogged(): boolean {
      if (sessionStorage.getItem("token")) {
         return true;
      }
      return false;
   }
}
