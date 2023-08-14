import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { CarDto } from '../dto/carDto';
const { apiUrl } = environment;
@Injectable({
  providedIn: 'root'
})
export class CarService {

  private numberProducts= new BehaviorSubject(0);
  public readonly getNumberProducts: Observable<any> = this.numberProducts.asObservable();

  constructor(private http: HttpClient) {
    this.setNumberProducts();
   }


  public getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${apiUrl}/coches`);
  }

  public registerCar(newCar: CarDto): Observable<CarDto>{
    return this.http.post<CarDto>(`${apiUrl}/coches`, newCar);
  }

  public setNumberProducts(): void{
    let count: number = 0;
    let carsPurchase: Array<CarsPurchaseDto> = JSON.parse(localStorage.getItem("carsPurchase"));

    if(!carsPurchase){
      this.numberProducts.next(0);
      return;
    }
    console.log("nulo: ", carsPurchase)
    carsPurchase.forEach(car => count += car.quantityCars);
    this.numberProducts.next(count);
    
  }
}