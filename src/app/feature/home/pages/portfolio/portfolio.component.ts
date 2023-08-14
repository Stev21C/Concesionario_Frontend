import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/core/dto/carDto';
import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { CarService } from 'src/app/core/services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit{
  public listCarsPortfolio: CarDto[];

  public carsPurchase: Array<CarsPurchaseDto>;

  constructor(private carService: CarService) {
    //this.carsPurchase = []; // Se iniciliza arreglo
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
        console.log(this.listCarsPortfolio);
      },
    });
  }

  ngOnInit(): void{
    this.carsPurchase = JSON.parse(localStorage.getItem("carsPurchase")) ? JSON.parse(localStorage.getItem("carsPurchase")): [];
    this.carService.setNumberProducts();
  }

  /**
   * Agregar coche a carrito
   * @param carNew
   */
  public addShoppingCart(carNew: CarDto): void {
    let added: boolean = false;

    if (this.carsPurchase.length > 0) {
      // Si existen carros en la lista
      // recorro la lista

      for (let i:number = 0; i < this.carsPurchase.length && added == false; i++) { //recorro la lista
        let car: CarsPurchaseDto = this.carsPurchase[i];

        if (car.codeCar == carNew.codeCar) {// El carro pertenece al codigo
          if (car.quantityCars + 1 > carNew.stock) {
            Swal.fire({
              icon: 'error',
              title: 'Error al agregar',
              text: 'No puede agregar cantidades superiores a los vehiculos disponibles',
              timer: 4000,
            });
            added = true;
          } else {
            car.quantityCars += 1;
            car.totalPriceCars += carNew.price;  
            added = true;
            /*this.listCarsPortfolio.forEach(car => {
              if(car.codeCar == carNew.codeCar){
                car.stock = car.stock -1
              }
            }) // disminuir y ver en front en tiemp real*/
          }
        }
      }
      //this.carsPurchase.forEach((car: CarsPurchaseDto) => {});
    }

    /** Agregacion
     * Si el carro no existe lo agrego por primera vez
     */
    if (!added) {
      let carPurchase: CarsPurchaseDto = {
        codeCar: carNew.codeCar,
        quantityCars: 1,
        totalPriceCars: carNew.price,
      };
      /*this.listCarsPortfolio.forEach(car => {
        if(car.codeCar == carNew.codeCar){
          car.stock = car.stock -1
        }
      })*/

      this.carsPurchase.push(carPurchase);
      
    }

    localStorage.setItem('carsPurchase', JSON.stringify(this.carsPurchase)); // Se envia lista porque la pag esta en otro componente, nunca se vence, sigue teniendo la lista
    this.carService.setNumberProducts();
    console.log("coche agregado",this.carsPurchase)
  }

  /**
   * Elimina cohce del carrito
   * @param carNew
   */
  public deleteShoppingCart(carNew: CarDto): void {
    let carActual= this.carsPurchase.find(car => car.codeCar == carNew.codeCar); // Busco el coche que intentan eliminar
    let deleted: boolean= false;

    if (carActual == null){
      Swal.fire({
        icon:"info",
        title: 'Eliminar del carrito',
        text: 'No has agregado ninguna unidad del coche actual',
        timer: 4000
      })
    }else{
      for (let i:number = 0; i < this.carsPurchase.length && deleted == false; i++) { //recorro la lista
        let car: CarsPurchaseDto = this.carsPurchase[i];

        if (car.codeCar == carNew.codeCar) {
          if ((car.quantityCars - 1) ==0) {
            this.carsPurchase.splice(i, 1);
          } else {
            car.quantityCars -= 1;
            car.totalPriceCars -= carNew.price;
            deleted = true;
            /*this.listCarsPortfolio.forEach(car => {
              if(car.codeCar == carNew.codeCar){
                car.stock = car.stock +1
              }
            })*/
          }
        }

      }
    }
    localStorage.setItem('carsPurchase', JSON.stringify(this.carsPurchase));
    console.log("coche eliminado",this.carsPurchase)
    this.carService.setNumberProducts();
  }
}
