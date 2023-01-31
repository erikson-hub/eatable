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
      if (!localStorage.getItem("category")) {
         this.setCategory("Italian");
      }
      this.categories = this.foodsService.getCategories();
   }

   ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
         const category = paramMap.get("category");
         if (category) {
            this.foods = this.foodsService.getFoodsByCategory(category);
            this.setCategory(category);
         } else {
            this.foods = this.foodsService.getFoodsByCategory(
               this.getCategory()
            );
         }
      });
   }

   setCategory(category: string) {
      localStorage.setItem("category", category);
   }

   getCategory(): string {
      return localStorage.getItem("category") || "Italian";
   }

   searchFoods(search: string) {
      this.foods = this.foodsService.searchFoods(search, this.getCategory());
      this.found = this.search === "" ? 0 : this.foods.length;
   }

   getFoodsByCategory(category: string) {
      this.search = "";
      this.setCategory(category);
      this.foods = this.foodsService.getFoodsByCategory(category);
   }

   clearSearch() {
      this.search = "";
      this.foods = this.foodsService.getFoodsByCategory(this.getCategory());
   }

   toggleSearch() {
      const search = document.getElementById("search");
      if (search) {
         search.focus();
      }
   }
}
