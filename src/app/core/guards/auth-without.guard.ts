import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthWithoutGuard{


  constructor(private tokenService: TokenService, private router:Router){

  }


  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      

    if(!this.tokenService.getToken()){ // Si no existe token, no lo deje ingresar
      alert("Para ingresar debes iniciar sesion");
      this.router.navigateByUrl("/autenticacion/inicio-sesion");
      return false;
    }

    return true;
    // simplificado: return this.tokenService.getToken();

  }
  
}
