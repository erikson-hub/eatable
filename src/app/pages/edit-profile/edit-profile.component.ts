import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.llenarPerfil();
  }

  llenarPerfil() {
    this.profileService.getProfile().subscribe((profile: any) => {
      console.log(profile);

      const { name, email, phone, address } = profile;

      this.loginForm.setValue({ name, email, phone, address });
    });
  }

  actualizarPerfil() {
    // console.log(this.loginForm.value);
    this.profileService
      .updateProfile(this.loginForm.value)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
