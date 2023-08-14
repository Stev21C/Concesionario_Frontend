import { CarService } from 'src/app/core/services/car.service';
import { Subscription } from 'rxjs';
import { TokenService } from './../../../../core/services/token.service';
import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent{

  public nameCustomer: string;
  public emailCustomer: string;

  public numberProducts: number =0;
  public subscriptionNumber: Subscription;

  constructor(private tokenService:TokenService, private carService: CarService){
    this.nameCustomer= this.tokenService.getInfoToken().fullname;
    this.emailCustomer= this.tokenService.getInfoToken().email;
    
    this.subscriptionNumber = this.carService.getNumberProducts.subscribe({
      next: value => this.numberProducts = value,
    })
  }

  public logout(){
    this.tokenService.deleteToken();
  }

}
