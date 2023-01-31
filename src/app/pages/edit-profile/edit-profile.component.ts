import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit() {
    this.llenarPerfil();
  }

  llenarPerfil() {
    this.profileService.getProfile().subscribe((profile: any) => {
      this.loginForm.patchValue(profile);
    });
  }

  actualizarPerfil() {
    // console.log(this.loginForm.value);
    this.profileService
      .updateProfile(this.loginForm.value)
      .subscribe((data) => {
        console.log(data);
        alert('Se actualizaron tus datos correctamente');
        this.router.navigate(['/profile']);
      });
  }
}
