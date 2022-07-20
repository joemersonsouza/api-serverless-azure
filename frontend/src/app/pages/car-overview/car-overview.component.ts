import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatPaginator, MatSort } from '@angular/material';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/services/car.service';

export interface SortField {
  key: string,
  value:string
}

@Component({
  selector: 'app-car-overview',
  templateUrl: './car-overview.component.html',
  styleUrls: ['./car-overview.component.sass']
})
export class CarOverviewComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) 
  paginator: MatPaginator;
  @ViewChild(MatSort, {read: ElementRef, static: false}) 
  sort: MatSort;
  @ViewChild(MatDrawer, {static: false}) 
  drawer: MatDrawer;

  displayedColumns: string[] = ['maker', 'model_name', 'color', 'year', 'monthlyPrice', 'availableDate'];
  dataSource: Car[] = [];
  sortFilds = [{key:'maker', display: 'Maker'}, {key:'model_name', display: 'Model Name'}, {key:'color', display: 'Color'},
  {key:'year', display: 'Year'}, {key:'monthlyPrice', display: 'Monthly Price'}, {key:'availableDate', display: 'Available From'}]
  showProgress: boolean = false;
  resultsLength = 0;
  
  constructor(private service: CarService) { }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.showProgress = true;
    this.service.getAll().subscribe(response => {
      if(response) {
        this.dataSource = response.cars;
        this.resultsLength = response.totalPage;
      }
      this.showProgress = false;
    });
  }

  carSelected(car:Car) {
    this.service.currentCar.next({...car});
  }

  refreshData(limit: number, offset: number, search:string="", sort: SortField = null) {
    this.showProgress = true;
    this.service.getAll(offset, limit, search, sort ? sort.key : "monthlyPrice").subscribe(response => {
      if(response) {
        this.dataSource = response.cars;
        this.resultsLength = response.totalPage;
      }
      this.showProgress = false;
    });
  }

}
