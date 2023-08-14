import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from "../services/token.service";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("entre al interceptor");

    let headers;

    let token = this.tokenService.getToken();  //Llamo a mi servicio de token y lo pido

    if (!token) {   // Si token existe no haga nada, para no enviar autorization vacio
      return next.handle(request); // se retorna la peticion que se clono
    }

    headers = {  // si existe token, cree obj de headers
      'Authorization': 'Bearer '+token  // autorization igual que envia postman
    }

    let authRequest = request.clone({  // se clona la peticion para cambiar los headers
      setHeaders: {
        ...headers
      },
    });

    console.log(authRequest)    
    return next.handle(authRequest).pipe(  // se retorna la peticion que se clono, el pipe permite sacar mas funciones
      catchError((err: HttpErrorResponse) => {   
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos para acceder a ésta página.'
          })
          this.tokenService.deleteToken();
          this.router.navigateByUrl("/autenticacion/inicio-sesion");
        }
        return throwError(() => err);
      })
    );
  }
}