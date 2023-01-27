import { Injectable } from "@angular/core";
import { Food } from "../models/food.model";
import foods_json from "./foods.json";

@Injectable({
   providedIn: "root",
})
export class FoodsService {
   foods: Array<Food> = foods_json.foods;
   selectedFood?: Food | any = null;

   constructor() {}

   getFoods(): Array<Food> {
      return this.foods;
   }

   getCategories(): Array<string> {
      const categories = this.foods.map((food) => food.category);
      return [...new Set(categories)];
   }

   getFoodsByCategory(category: string): Array<Food> {
      return this.foods.filter((food) => food.category === category);
   }

   getFoodsBySearch(search: string, category: string): Array<Food> {
      return this.foods.filter(
         (food) =>
            food.name.toLowerCase().includes(search.toLowerCase()) &&
            food.category === category
      );
   }

   getFoodById(id: string): Food | any {
      return this.foods.find((food) => food.id === id);
   }

   setFood(food: Food) {
      this.selectedFood = food;
   }

   getFood() {
      return this.selectedFood;
   }
}
