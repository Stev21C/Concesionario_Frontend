import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { TokenService } from './../../../../core/services/token.service';
import { PurchaseService } from './../../../../core/services/purchase.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {

  public historyPurchase: Array<any>;

  public carsSold: Array<CarsPurchaseDto>;

  constructor(private purchaseService:PurchaseService, private tokenService:TokenService){
    this.purchaseService.getAllPurchaseByIdCustomer(this.tokenService.getInfoToken().cardId).subscribe({
      next: value =>{
        this.historyPurchase = value;
      }
    })
  }

  public showListCarsPurchase(carsPurchase :Array<CarsPurchaseDto>): void{
    this.carsSold = carsPurchase;
  }

}
