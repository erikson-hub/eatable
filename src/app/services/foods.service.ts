import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Food } from "../models/food.model";

@Injectable({
   providedIn: "root",
})
export class FoodsService {
   private API_URL = "http://localhost:8000/api";

   constructor(private http: HttpClient) {
      this.getFoods();
   }

   getFoods(): void {
      this.http.get(`${this.API_URL}/products`).subscribe((foods: any) => {
         localStorage.setItem("foods", JSON.stringify(foods));
      });
   }

   foods(): Array<Food> {
      return JSON.parse(localStorage.getItem("foods") || "[]");
   }

   getCategories(): Array<string> {
      const categories = this.foods().map((food) => food.category);
      return [...new Set(categories)];
   }

   getFoodsByCategory(category: string): Array<Food> {
      return this.foods().filter((food) => food.category === category);
   }

   searchFoods(search: string, category: string): Array<Food> {
      return this.foods().filter(
         (food) =>
            food.name.toLowerCase().includes(search.toLowerCase()) &&
            food.category === category
      );
   }

   getFoodById(id: string): Food | any {
      return this.foods().find((food) => food._id === id);
   }

   getFood(category: string, name: string): Food | any {
      return this.foods().find(
         (food) => food.category === category && food.name === name
      );
   }
}
