import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-aesthetic-car',
  templateUrl: './info-aesthetic-car.component.html',
  styleUrls: ['./info-aesthetic-car.component.css']
})
export class InfoAestheticCarComponent implements OnInit{

  public infoAestheticForm: any;

  constructor(private controlContainer: ControlContainer){    // 2. Se carga cuando se contruye el componeente

  }

  ngOnInit(): void {
    this.infoAestheticForm = this.controlContainer.control;  // Formulario es control, todos los elementos dentro de formulario (register-car/registerCarForm) son controles
    this.infoAestheticForm = this.infoAestheticForm.controls["infoAestheticForm"];
  }

}
