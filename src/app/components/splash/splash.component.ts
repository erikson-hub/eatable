import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent implements OnInit {
  out: boolean = false;
  visible: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.out = true;

      setTimeout(() => {
        this.visible = false;
      }, 500);
    }, 2000);
  }
}
