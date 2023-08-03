import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../enums/Roles';
import Swal from 'sweetalert2';

/**
 * Aca podria poner todos los guards de la carpeta guards
 */
@Injectable({
  providedIn: 'root'
})
export class GuardsService {

  constructor(private tokenService: TokenService, private router:Router){
  }


  /**
   * Control de autenticacion si el usuario esta registrado
   * @returns 
   */
  public canActivateLogin(): boolean {
    if(this.tokenService.getToken()){ // Si no existe token, no lo deje ingresar y si tiene token no le permite a login o reister
      this.router.navigateByUrl("/portafolio");
      return false;
    }
    
    return true;
  }


  /**
   * Verificar si el usuario tiene rol admin
   * Toma info del backend, lo envia en token
   */
  public canActiveWithRolAdmin(): boolean{
    if(this.tokenService.getInfoToken().rol != Roles.ADMIN /*&& !this.canActivateWithAuth*/){ 
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tiene permisos para acceder a esta sección',
      });
      this.router.navigateByUrl("/portafolio");
      return false;
    }
    
    return true;
  }


  
}
