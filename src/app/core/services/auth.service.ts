import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLoginRequestDto } from '../dto/authLoginRequestDto';
import { Observable, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthLoginResponseDto } from '../dto/authLoginResponseDto';
import { RegisterRequestDto } from '../dto/authRegisterDto';
import { RegisterResponseDto } from '../dto/registerResponseDto';
//const {apiUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService:TokenService) { }   // Herramienta Angular para hacer peticiones http a apis



  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto>{  
    return this.http.post<AuthLoginResponseDto>(`${this.apiUrl}/auth/sign-in`, authDto).pipe(  // Indico que manejo fljo antes de responder
      
      tap(response =>{
        this.tokenService.saveToken(response.jwt);
      })
      
      /*{   cambiando pipe por susbcribe
      next: value =>{
        this.tokenService.saveToken(value.jwt);
      }
    }*/
    
    );  // Peticion al back, con ruta del controller, le paso el body u obj
  }



  public register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto>{
    return this.http.post<RegisterResponseDto>(`${this.apiUrl}/auth/register`, registerDto);
  }

}
