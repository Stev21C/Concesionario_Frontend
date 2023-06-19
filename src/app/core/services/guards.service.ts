import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Aca podria poner todos los guards de la carpeta guards
 */
@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(private tokenService: TokenService, private router:Router){
  }


  public canActivateWithAuth(): boolean {
    if(this.tokenService.getToken()){ // Si no existe token, no lo deje ingresar y si tiene token no le permite a login o reister
      this.router.navigateByUrl("/portafolio");
      return false;
    }
    
    return true;
  }


  
}
