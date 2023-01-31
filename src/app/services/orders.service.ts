import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { ProfileService } from './profile.service';

const API_URL = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private cartService: CartService,
    private router: Router
  ) {}

  createOrder() {
    this.profileService.getProfile().subscribe((profile: any) => {
      const items = this.cartService.getItems();

      this.http
        .post(`${API_URL}/orders`, {
          user_id: profile._id,
          delivery_address: profile.address,
          items: items.map((item) => {
            return { product_id: item.food._id, quantity: item.quantity };
          }),
        })
        .subscribe((data) => {
          alert('Se completó tu orden');
          this.router.navigate(['/history']);
        });
    });
  }

  getOrders() {
    return this.http.get(`${API_URL}/orders`);
  }
}