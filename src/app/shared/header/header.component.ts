import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  public fecha = new Date();

  ngOnInit(): void {

    this.fecha = new Date();
 
    setInterval(() => {
 
      this.fecha = new Date();
 
    }, 1000);

  }

}
