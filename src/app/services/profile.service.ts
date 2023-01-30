import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfile() {
    return this.http.get(`${API_URL}/profile/${this.authService.user.id}`);
  }

  updateProfile(profile: any) {
    return this.http.put(
      `${API_URL}/profile/${this.authService.user.id}`,
      profile
    );
  }
}
