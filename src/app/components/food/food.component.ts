import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { ActivatedRoute } from '@angular/router';
import { FoodsService } from '../../services/foods.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent implements OnInit {
  food: Food | any = null;
  category: string | any = null;
  added = false;
  buttonText = 'Add to Cart';

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodsService: FoodsService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const category = paramMap.get('category');
      const food = paramMap.get('food');
      if (category && food) {
        this.category = category;
        this.food = this.foodsService.getFood(
          category,
          food.split('-').join(' ')
        );
      } else {
        this.food = null;
      }
    });
  }

  addToCart() {
    this.added = !this.added;
    this.buttonText = this.added ? 'Added to Cart' : 'Add to Cart';
  }
}
