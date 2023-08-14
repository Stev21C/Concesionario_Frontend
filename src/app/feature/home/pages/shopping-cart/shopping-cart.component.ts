import { PurchaseService } from './../../../../core/services/purchase.service';
import { TokenService } from './../../../../core/services/token.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarDto } from 'src/app/core/dto/carDto';
import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { PurchaseRequestDto } from 'src/app/core/dto/purchaseRequestDto';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  public listCarsPurchase: Array<CarsPurchaseDto>;
  public numberBill: string;
  public purchaseSaved: boolean = false;

  constructor (private tokenService: TokenService, private purchaseService:PurchaseService){
    this.listCarsPurchase = JSON.parse(localStorage.getItem("carsPurchase")) // el get item reorna string y debo conver a objeto
  }

  public registerPurchase(): void{

    let totalArticulos: number=0;
    this.listCarsPurchase.forEach(car => totalArticulos += car.totalPriceCars)

    let newPurchase: PurchaseRequestDto={
      cardIdCustomer: this.tokenService.getInfoToken().cardId,
      date: new Date(Date.now()),
      carsPurchase: this.listCarsPurchase,
      paymentMethod: "Ahorros",
      total: totalArticulos

    }

    this.purchaseService.registerPurchase(newPurchase).subscribe({
      next: value =>{
        this.numberBill= value.numberBill;
        this.purchaseSaved = true;
        localStorage.setItem("carsPurchase", "");
        localStorage.removeItem("carsPurchase");
      }
      
    })
  }



}
