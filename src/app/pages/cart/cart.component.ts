import { Component } from '@angular/core';

interface Producto{
  img:string;
  name:string;
  precio:number;
  cantidad:number
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  listproduct:Producto[]=[
    {
      img:'../../../assets/images/pasta_dish.jpg',
      name:'Veguie Tomato',
      precio:75.45,
      cantidad:30
    }
    
  ]

}
