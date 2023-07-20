import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators{


    /**
     * Valida si el numero ingresado pertenece a una fecha futura
     * @param control
     * @return Null si la fecha es valida, invalidDate: true de lo contrario
     */
    public static numberDateFuture (control: FormControl): { [p: string]: boolean } | null {
        if (control.value) {
            const today = new Date(Date.now()).getFullYear();
            if (control.value > (today)) {
                return {'invalidDate': true }
            }
        }
        return null;
    }


    /**
     * 
     * @param email Validar email con parametro customizado
     * @returns 
     */
    static EmailValidator(email:string): ValidatorFn{   //recibo email y retorno funcion validator validatorFN
        return (control:AbstractControl) : ValidationErrors | null => { // retirna valitors error

            const emailCtrl: string = control.get(email).value;

            if(emailCtrl.match("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"   // Expresiones regulares
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$")){

                return {emailValidate: true}
            }
            return null;
        };
    }

}