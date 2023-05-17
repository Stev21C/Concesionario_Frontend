import { Injectable } from '@angular/core';
import { getCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string{
    return getCookie("token");
  }

  public saveToken(token: string): void{
    // Guarda lo que recibi en local storage o Cookies

    // Cookie
    setCookie("token", token, {expires: 1, path:"/"});

    // local storage
    //localStorage.setItem("token", token);
  }

  public deleteToken(): void{

  }
}
