import { Component } from '@angular/core';
import { Food } from 'src/app/models/food.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
})
export class FoodComponent {
  currentFood!: Food;
  foodId: string | null = null;
}
