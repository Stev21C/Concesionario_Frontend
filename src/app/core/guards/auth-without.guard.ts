import { TokenService } from '../services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Para acceder a esta pagina debes iniciar sesion!',
      }); 
      this.router.navigateByUrl("/autenticacion/inicio-sesion");
      return false;
    }

    return true;
    // simplificado: return this.tokenService.getToken();

  }
  
}
