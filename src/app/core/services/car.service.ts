import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { CarDto } from '../dto/carDto';
const { apiUrl } = environment;
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }


  public getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/coches`);
  }

  public registerCar(newCar: CarDto): Observable<CarDto>{
    return this.http.post<CarDto>(`${apiUrl}/coches`, newCar);
  }

}