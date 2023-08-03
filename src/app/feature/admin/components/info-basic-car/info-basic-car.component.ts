import { BrandCarService } from './../../../../core/services/brand-car.service';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BrandCarDto } from 'src/app/core/dto/brandCarDto';

@Component({
  selector: 'app-info-basic-car',
  templateUrl: './info-basic-car.component.html',
  styleUrls: ['./info-basic-car.component.css']
})
export class InfoBasicCarComponent implements OnInit{

  public infoBasicForm: any;

  // 1. Cargo lista de carros
  public listBrandCar: BrandCarDto[];

  constructor(private controlContainer: ControlContainer,
    private brandCarService:BrandCarService){    // 2. Se carga cuando se contruye el componeente

      this.brandCarService.getAllBrandsCar().subscribe({
        next: value => this.listBrandCar = value   // Se recibe lista de marca de carros BrandCarDto[] como value
      })
  }

  // Primero pasa por constructor ^ y luego OnInit, ciclo de vida
  // Envia la informacion del form al papá, otros componentes padres lo pueden llamar

  ngOnInit(): void {
    this.infoBasicForm = this.controlContainer.control;  // Formulario es control, todos los elementos dentro de formulario (register-car/registerCarForm) son controles
    this.infoBasicForm = this.infoBasicForm.controls["infoBasicForm"]; // ENCADENA formulario hijo con form papá de register-car
  }

  




}
