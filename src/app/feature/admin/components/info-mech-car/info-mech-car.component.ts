import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-info-mech-car',
  templateUrl: './info-mech-car.component.html',
  styleUrls: ['./info-mech-car.component.css']
})
export class InfoMechCarComponent implements OnInit{

  public infoMechForm: any;

  constructor(private controlContainer: ControlContainer){    // 2. Se carga cuando se contruye el componeente

  }

  ngOnInit(): void {
    this.infoMechForm = this.controlContainer.control;  // Formulario es control, todos los elementos dentro de formulario (register-car/registerCarForm) son controles
    this.infoMechForm = this.infoMechForm.controls["infoMechForm"];
  }

}
