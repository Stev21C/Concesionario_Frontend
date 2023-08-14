import { CustomerJwtDto } from './../dto/customerJwtDto';
import { Injectable } from '@angular/core';
import { Cookies, getCookie, setCookie } from 'typescript-cookie';
import jwt_decode from "jwt-decode";

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
    localStorage.removeItem("carsPurchase")
    Cookies.remove("token");
  }


  public getInfoToken(): CustomerJwtDto{
    let infoToken = jwt_decode(getCookie("token"));
    return <CustomerJwtDto>infoToken;
  }
}
