import { Component } from '@angular/core';
import { FoodsService } from 'src/app/services/foods.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  orders!: any[];

  filtrar: boolean = false;

  constructor(
    public ordersService: OrdersService,
    private foodsService: FoodsService
  ) {}

  calculateOrderTotalPrice(items: any): number {
    return 0;
  }

  ngOnInit() {
    this.ordersService.getOrders().subscribe((data: any) => {
      this.orders = data.map(
        ({ date, delivery_address, items: products }: any) => {
          const items = products.map(({ product_id, quantity }: any) => {
            const food = this.foodsService.getFoodById(product_id);
            return {
              food,
              quantity,
              totalPrice: food.price * quantity,
            };
          });

          return {
            date,
            delivery_address,
            totalItems: items.length,
            items,
            totalPrice: this.calculateOrderTotalPrice(items),
          };
        }
      );

      console.log(this.orders);
    });
  }

  expandir = () => {
    if (this.filtrar) {
      this.filtrar = false;
    } else {
      this.filtrar = true;
    }
  };
}
