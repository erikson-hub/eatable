import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { Food } from "../../models/food.model";
import { FoodsService } from "../../services/foods.service";

@Component({
   selector: "app-home",
   templateUrl: "./home.component.html",
   styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
   foods: Array<Food> | any = null;
   categories: Array<string>;
   search: string = "";
   found: number = 0;
   selectedCategory: string = "Italian";

   constructor(
      private foodsService: FoodsService,
      private activatedRoute: ActivatedRoute,
      public cartService: CartService
   ) {
      this.foods = this.foodsService.getFoodsByCategory(this.selectedCategory);
      this.categories = this.foodsService.getCategories();
      //console.log(this.foods);
   }

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
         const category = paramMap.get("category");
         if (category) {
            this.getFoodsByCategory(category);
         }
      });
   }

   searchFoods(search: string) {
      this.foods = [
         ...this.foodsService.searchFoods(search, this.selectedCategory),
      ];
      this.found = this.search === "" ? 0 : this.foods.length;
   }

   getFoodsByCategory(category: string) {
      this.search = "";
      this.selectedCategory = category;
      this.foods = this.foodsService.getFoodsByCategory(category);
   }

   clearSearch() {
      this.foods = this.foodsService.getFoodsByCategory(this.selectedCategory);
      this.search = "";
   }

   toggleSearch() {
      const search = document.getElementById("search");
      if (search) {
         search.focus();
      }
   }
}
