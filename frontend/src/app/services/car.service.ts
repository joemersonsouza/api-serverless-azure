import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Car } from '../model/car';
import { map,catchError } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { CarMultiResult } from '../model/multi_result';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  currentCar: Subject<Car> = new Subject()

  header = {"content-type": "application/json; charset=UTF-8"}
  
  constructor(private httpClient: HttpClient) {}

  public getAll(limit:number = 10, offset: number = 0, search: string = "", sort:string = "monthlyPrice"): Observable<CarMultiResult> {
    return this.httpClient.get<any>(`${env.baseUrl}/search?search=${search}&offset=${offset}&limit=${limit}&sort=${sort}`, {headers: this.header})
      .pipe( 
          catchError(this._handleError<CarMultiResult>('get cars failed', null))
      ); 
  }

  save(car: Car): Observable<Car> {
    return this.httpClient.post<any>(`${env.baseUrl}/create`, car ,{headers: this.header})
      .pipe(
        catchError(this._handleError<any>('get cars failed', null))
      ); 
  }

  update(car: Car): Observable<Car> {
    console.log(car.id)
    return this.httpClient.put<any>(`${env.baseUrl}/change/${car.id}`, car ,{headers: this.header})
      .pipe(
        catchError(this._handleError<any>('get cars failed', null))
      ); 
  }

  _handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log("ERRO", error);

      return of(result as T);
    };
}
}
