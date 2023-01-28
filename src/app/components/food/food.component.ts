import { Component, Input } from "@angular/core";
import { Food } from "src/app/models/food.model";
import { FoodsService } from "../../services/foods.service";

@Component({
   selector: "app-food",
   templateUrl: "./food.component.html",
   styleUrls: ["./food.component.css"],
})
export class FoodComponent {
   food: Food = this.foodsService.getFood();
   // currentFood!: Food;
   // foodId: string | null = null;

   constructor(private foodsService: FoodsService) {
      console.log(this.food);
   }

   added = false;
   buttonText = "Add to Cart";

   addToCart() {
      this.added = !this.added;
      this.buttonText = this.added ? "Added to Cart" : "Add to Cart";
   }
}
