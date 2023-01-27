import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Food } from "../../models/food.model";
import { FoodsService } from "../../services/foods.service";

@Component({
   selector: "app-home",
   templateUrl: "./home.component.html",
   styleUrls: ["./home.component.css"],
})
export class HomeComponent {
   foods: Array<Food> | any = null;
   categories: Array<string>;
   search: string = "";
   found: number = 0;
   selectedCategory: string = "Italian";
   selectedFood?: Food | any = null;

   constructor(
      private foodsService: FoodsService,
      private activatedRoute: ActivatedRoute
   ) {
      this.foods = this.foodsService.getFoodsByCategory(this.selectedCategory);
      this.categories = this.foodsService.getCategories();
      console.log(this.foods);
   }

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
         const category = paramMap.get("category");
         if (category) {
            this.getFoodsByCategory(category);
         }
         const name = paramMap.get("food");
         if (name && this.foods) {
            const id = this.foods.find((food: Food) => {
               return food.name === name;
            }).id;
            this.getFood(id);
         }
      });
   }

   getFoodsBySearch(search: string) {
      this.foods = this.foodsService.getFoodsBySearch(
         search,
         this.selectedCategory
      );
      this.found = this.search === "" ? 0 : this.foods.length;
   }

   getFoodsByCategory(category: string) {
      this.foods = this.foodsService.getFoodsByCategory(category);
      this.selectedCategory = category;
      this.found = 0;
   }

   getFood(id: string) {
      if (!this.foods) {
         return;
      }
      this.foods.find((food: Food) => {
         if (food.id === id) {
            this.selectedFood = food;
         }
      });
      console.log(this.selectedFood);
   }

   clearSearch() {
      this.foods = this.foodsService.getFoodsByCategory(this.selectedCategory);
      this.search = "";
   }
}
