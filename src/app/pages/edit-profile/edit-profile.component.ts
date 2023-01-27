import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  loginForm = new FormGroup({
    name: new FormControl('Margarita'),
    email: new FormControl('mari@mail.com'),
    phone: new FormControl('987654321'),
    address: new FormControl('Calle los Rosales, Urb El Jardin'),
  });
}
