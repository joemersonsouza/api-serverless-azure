import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.sass']
})
export class CarDetailComponent implements OnInit {

  @Input()
  drawer

  makers: string[]=["BMW", "Toyota", "Renault"]
  models: string[]=[]

  car: Car = new Car();

  showProgress: boolean = false;

  constructor(private service: CarService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.service.currentCar.subscribe(value => 
      {
        this.car = value;
        this.setModels(this.car.maker);
        this.setModel(this.car.model_name);
      });
  }

  setModels(maker: string) {
    this.car.maker = maker;
    if(maker==this.makers[0]) {
      this.models = ["Series3", "X1"]
    } else if(maker==this.makers[1]) {
      this.models = ["RAV4", "Yaris"]
    } else if(maker==this.makers[2]) {
      this.models = ["Clio", "Megane"]
    }
  }

  setModel(model: string) {
    this.car.model_name = model;
  }

  save() {
    this.showProgress = true;
    if(this.car.id) {
      this.service.update(this.car).subscribe(response => {
        if(response) {
          this.toast.success(`${response.maker} ${response.model_name} saved `, "")
          this.drawer.toggle();
        } else {
          this.toast.error("Please verify your fields", "")
        }
        this.showProgress = false;
      });  
    } else {
      this.service.save(this.car).subscribe(response => {
        if(response) {
          this.toast.success(`${response.maker} ${response.model_name} saved `, "")
          this.drawer.toggle();
        } else {
          this.toast.error("Please verify your fields", "")
        }
        this.showProgress = false;
      });
    }
  }

  cancel() {
    this.car = new Car();
    this.drawer.toggle();
  }

}
