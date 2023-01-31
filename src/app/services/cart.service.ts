import { Injectable } from '@angular/core';

import { Food } from '../models/food.model';
import { FoodsService } from '../services/foods.service';

interface Cart {
  items: CartItem[];
}

interface CartItem {
  food: Food;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private foodsService: FoodsService) {}

  private _setCart(cart: Cart | null): void {
    sessionStorage.setItem('cart', JSON.stringify(cart || { items: [] }));
  }

  private _getCart(): Cart {
    return JSON.parse(sessionStorage.getItem('cart') || '{ "items": []}');
  }

  getItems(): CartItem[] {
    const cart = this._getCart();
    return cart.items;
  }

  addFood(foodId: string, quantity: number) {
    const cart = this._getCart();

    // Buscar si el producto ya
    // existe en el carrito.
    const item = cart.items.find((item) => item.food._id === foodId);

    // Si ya existe, modificar el quantity.
    if (item) {
      item.quantity += quantity;
    }

    // Si no, push por primera vez.
    else {
      cart.items.push({
        food: this.foodsService.getFoodById(foodId),
        quantity,
      });
    }

    this._setCart(cart);
  }

  removeFood(foodId: string, quantity: number) {
    const cart = this._getCart();

    // Revisar si existe el CartItem que
    // contiene ese foodId.
    const item = cart.items.find((item) => item.food._id === foodId);
    if (!item) {
      return;
    }

    item.quantity -= quantity;
    if (item.quantity < 1) {
      // item.quantity = 0;
      const index = cart.items.findIndex((item) => item.food._id === foodId);
      cart.items.splice(index, 1);
    }

    this._setCart(cart);
  }

  calculateTotalPrice(): number {
    const cart = this._getCart();
    let total = 0;

    cart.items.forEach((item) => {
      total += item.quantity * item.food.price;
    });

    return total;
  }

  calculateTotalQuantity(): number {
    const cart = this._getCart();
    let total = 0;

    cart.items.forEach((item) => {
      total += item.quantity;
    });

    return total;
  }

  isInTheCart(foodId: string): boolean {
    if (this.getItems().findIndex((item) => item.food._id === foodId) > -1) {
      return true;
    }
    return false;
  }

  clear() {
    this._setCart(null);
  }
}
