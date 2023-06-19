import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RegisterRequestDto } from 'src/app/core/dto/authRegisterDto';
import { ErrorsForm } from 'src/app/core/enums/ErrorsForm';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/CustomValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent{

  public registerForm: FormGroup;

  public passwordGenerated: string;

  public registered: boolean= false;
  

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService){
    super();
    this.registerForm= this.fb.group({
      cardId:['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"   // Expresiones regulares
      + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")]],
      cellphoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    }
    );
  }


  public async register(): Promise<void>{

    let dtoRegister: RegisterRequestDto= this.registerForm.value;

    //console.log("Formulario a guardar:", this.registerForm.value);

    if(this.registerForm.valid){
      await lastValueFrom(this.authService.register(dtoRegister)).then(resp =>{
        this.passwordGenerated= resp.password;
      });

      this.registered=true;
    }else{
      console.log(this.getAllErrorsForm(this.registerForm));
    }
  }
    /**
   * Retorna mensaje de error de un campo del formulario
   * @param field 
   * @returns 
   */
    public getErrorsForm(field: string): string{
      let message;
      const required: Array<String> = ["cardId", "fullname", "email", "cellphoneNumber"] // en el if valida si el campo existe en la lista del required
      const formatEmail: Array<String>= ["email"];
      const onlyNumber: Array<String>= ["cellphoneNumber"];
  
      // En este if agrego la lista que necesito validar
      if(required.includes(field) && this.isTouchedField(this.registerForm, field)){     // si esta en la lista y tiene el error del required o pattern, muestra mensaje
        if(this.registerForm.get(field).hasError('required')){
          message= 'El campo es requerido';
        }else if(formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')){  // para los pattern si hubieran mas se crea otra lista
          message= ErrorsForm.EMAIL_FORMAT; 
        }else if(onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')){  // para los pattern si hubieran mas se crea otra lista
          message= 'Ingrese solo numeros';
        }
      }

      /* Para dividirlo en caso de que se tenga otro pattern se crea una lista que tengan algo en comun

          const required (o pattern): array<String> = ["cardId", "fullname", "email", "cellphoneNumber"]

          
      */
  
      return message;
    }

}
