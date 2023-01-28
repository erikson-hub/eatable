import { Injectable } from "@angular/core";
import { Food } from "../models/food.model";
import foods_json from "./foods.json";

@Injectable({
   providedIn: "root",
})
export class FoodsService {
   foods: Array<Food> = foods_json.foods;

   constructor() {}

   getCategories(): Array<string> {
      const categories = this.foods.map((food) => food.category);
      return [...new Set(categories)];
   }

   getFoodsByCategory(category: string): Array<Food> {
      return this.foods.filter((food) => food.category === category);
   }

   searchFoods(search: string, category: string): Array<Food> {
      return this.foods.filter(
         (food) =>
            food.name.toLowerCase().includes(search.toLowerCase()) &&
            food.category === category
      );
   }

   getFoodById(id: string): Food | any {
      return this.foods.find((food) => food.id === id);
   }

   getFood(category: string, name: string): Food | any {
      return this.foods.find(
         (food) => food.category === category && food.name === name
      );
   }
}
