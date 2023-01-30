import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  profile!: Profile;

  constructor(
    private profileService: ProfileService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.profileService.getProfile().subscribe((profile: any) => {
      this.profile = profile;
    });
  }

  createOrder() {}
}
