import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
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
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService){
    super();
    this.loginForm= this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }
    );
  }

  public signIn(): void{

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

      this.authService.signIn(dtoLogin);

      console.log(dtoLogin);


    }else{
      alert("Campos obligatorios requeridos");
      console.log(this.getAllErrorsForm(this.loginForm));
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
