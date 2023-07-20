import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

  public listCarsPortfolio: any[];
/*
  constructor(private carService: CarService){
    this.carService.getAllCars().subscribe({
      next: value =>{
        this.listCarsPortfolio = value;
      }
    })
  }
*/
}
