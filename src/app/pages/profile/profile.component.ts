import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile!: Profile;

  constructor(
    private profileService: ProfileService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.profileService.getProfile().subscribe((profile: any) => {
      this.profile = profile;
    });
  }
}
