import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PurchaseRequestDto } from '../dto/purchaseRequestDto';
import { Observable } from 'rxjs';
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  /**
   * Registra una compra 
   * @param newPurchase compra a guardar
   * @returns 
   */
  public registerPurchase(newPurchase: PurchaseRequestDto): Observable<any>{
    return this.http.post(`${apiUrl}/purchases`, newPurchase)
  }

  public getAllPurchaseByIdCustomer(idCustomer: string): Observable<any>{
    return this.http.get(`${apiUrl}/purchases/customers/${idCustomer}`);

  }
}
