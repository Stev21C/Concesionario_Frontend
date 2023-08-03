import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BrandCarDto } from '../dto/brandCarDto';
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class BrandCarService {

  constructor(private http: HttpClient) { 
  }

  public getAllBrandsCar(): Observable<BrandCarDto[]>{
    return this.http.get<BrandCarDto[]>(`${apiUrl}/marcas_coches`)
  }
}
