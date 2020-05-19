import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import City from "../models/city";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AcoService {

  private readonly URL = 'https://localhost:44329/api/aco/';

  constructor(private httpClient: HttpClient) { }

  calculate(cities: City[]):Observable<any>{
    return  this.httpClient.post(this.URL + 'calculate',cities,
      { headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

}
