import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLoginRequestDto } from '../dto/authLoginRequestDto';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthLoginResponseDto } from '../dto/authLoginResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }   // Herramienta Angular para hacer peticiones http a apis



  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto>{  
    return this.http.post<AuthLoginResponseDto>(this.apiUrl+"/auth/sign-in", authDto)  // Peticion al back, con ruta del controller, le paso el body u obj
  }
}
