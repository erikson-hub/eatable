import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Food } from "../../models/food.model";
import { FoodsService } from "../../services/foods.service";

@Component({
   selector: "app-home",
   templateUrl: "./home.component.html",
   styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
   foods: Array<Food> | any = null;
   categories?: Array<string>;
   search: string = "";
   found: number = 0;

   constructor(
      private foodsService: FoodsService,
      private activatedRoute: ActivatedRoute
   ) {
      this.foodsService.getFoods().subscribe(() => {
         this.categories = this.foodsService.getCategories();
         this.getFoodsByCategory(this.getCategory());
      });
   }

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
         // Get category from URL
         const category = paramMap.get("category");
         let currentCategory: string;
         if (category) {
            currentCategory = category;
         } else {
            currentCategory = "Italian";
         }
         // Page load, refresh, or category change
         this.categories = this.foodsService.getCategories();
         this.getFoodsByCategory(currentCategory);
      });
   }

   setCategory(category: string) {
      localStorage.setItem("category", category);
   }

   getCategory(): string {
      return localStorage.getItem("category") || "Italian";
   }

   searchFoods(search: string, category: string) {
      this.foods = this.foodsService.searchFoods(search, category);
      this.found = this.search === "" ? 0 : this.foods.length;
      this.search = search;
   }

   getFoodsByCategory(category: string) {
      this.search = "";
      this.setCategory(category);
      this.foods = this.foodsService.getFoodsByCategory(category);
   }

   clearSearch() {
      localStorage.removeItem("search");
      this.getFoodsByCategory(this.getCategory());
   }

   toggleSearch() {
      const search = document.getElementById("search");
      if (search) {
         search.focus();
      }
   }
}
