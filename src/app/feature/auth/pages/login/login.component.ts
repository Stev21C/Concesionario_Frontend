import { TokenService } from './../../../../core/services/token.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthLoginRequestDto } from 'src/app/core/dto/authLoginRequestDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent{


  /**
   * Formulario reactivo Login
   */
  public loginForm: FormGroup;




  // Constructor donde se inyecta router
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService){
    super();
    this.loginForm= this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
    );
  }

  public async signIn(): Promise<void>{

    let dtoLogin: AuthLoginRequestDto;  // Obj que se envia a back

    if(this.loginForm.valid){
      alert("Correcto"); 

      let email = this.loginForm.get('email').value
      let password = this.loginForm.get('password').value

      dtoLogin = {     //Este obj se enviaria a back pero con any en let dtoLogin, por eso cambia el let
        email,
        password
      }

      /*
      dtoLogin={
        ...dtoLogin,
        "Nuevo Valor": "newVal"
      }*/

      await lastValueFrom(this.authService.signIn(dtoLogin)); // logueo
      console.log(this.tokenService.getToken());
      
                                        /*.subscribe(value =>{
        console.log("Se podria mostrar algo");
      });*/

      //console.log(dtoLogin);

      this.router.navigateByUrl("/portafolio");  //Estoy redirigiendo a pagina despues de logueo, es posible que pida await


    }else{
      alert("Campos obligatorios requeridos");
      console.log(this.getAllErrorsForm(this.loginForm));
      this.loginForm.markAllAsTouched();
    }
    
  }
/*
  public signUp(): void{
    this.router.navigateByUrl("autenticacion/registro"); con router, se cambio por routerlink
  }*/

  public getErrorsForm(field: string): string{
    let message;

    if(this.isTouchedField(this.loginForm, field)){
      if(this.loginForm.get(field).hasError('required')){
        message= 'El campo es requerido';
      }else if(this.loginForm.get(field).hasError('email')){
        message= 'Requiere formato email: example@mail.com';
      }
    }

    return message;
  }

}
