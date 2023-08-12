import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDto } from 'src/app/core/dto/carDto';
import { CarService } from 'src/app/core/services/car.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/CustomValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent extends AppBaseComponent {

  public registerCarForm: FormGroup;

  constructor(private fb: FormBuilder, private carService: CarService){

    super();
    this.registerCarForm = this.fb.group({

      infoBasicForm: this.fb.group({ //es un cotrol dentro de un formulario, con controles
        marcaCocheId: ['', Validators.required], // la comilla va valor por defecto a cargar, son controles
        reference: ['', Validators.required],
        price: ['', Validators.required],
        modelYear: ['', [Validators.required, CustomValidators.numberDateFuture]],
        category: ['', Validators.required],
        stock: ['', Validators.required],
      }),

      infoMechForm: this.fb.group({
        horsePower: ['', Validators.required],
        engineDisplacement: ['', Validators.required],
        transmission: ['', Validators.required],
        fuelType: ['', Validators.required],
        traction: ['', Validators.required],
        steering: ['', Validators.required],
      }),

      infoAestheticForm: this.fb.group({
        color: ['', Validators.required],
        numberDoor: ['', Validators.required],
        numberSeats: ['', Validators.required],
        imagePath: ['', Validators.required],
      }),

    })
  }

  public async registerCar(): Promise<void>{

    if(!this.registerCarForm.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tienes errores en formulario!',
      });
      console.log(this.getAllErrorsForm(this.registerCarForm));
      this.registerCarForm.markAllAsTouched();
      return;
    }

    let formData = this.registerCarForm.value;

    let formBasic = formData["infoBasicForm"]
    let formMech = formData["infoMechForm"]
    let formAesthetic = formData["infoAestheticForm"]

    let dtoRegisterCar: CarDto ={
      ...formBasic,
      ...formMech,
      ...formAesthetic
    }
    console.log("info del car a enviar: ", dtoRegisterCar);

    this.carService.registerCar(dtoRegisterCar).subscribe({
      next: value => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
        });
        console.log("Carro Guardado", value);
      },
      error: err =>{
        Swal.fire({
          icon: 'error',
          title: 'No se a podido registrar el carro',
          text: 'Ha ocurrido un error al regostrar el carro, por favor valide',
        });
        console.log(err);
      }
    })
    

  }

}
