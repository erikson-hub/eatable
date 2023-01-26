import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  filtrar : boolean = false;

  constructor() {    
  }
  
  expandir = () => {
    if (this.filtrar) {
      this.filtrar = false
    } else {
      this.filtrar = true
    }
  }
}
