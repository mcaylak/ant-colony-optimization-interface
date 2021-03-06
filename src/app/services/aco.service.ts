import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import City from "../models/city";
import {Observable} from "rxjs";
import AcoInput from "../models/aco-input";

@Injectable({
  providedIn: 'root'
})
export class AcoService {

  private readonly URL = 'https://localhost:44329/api/aco/';

  constructor(private httpClient: HttpClient) { }

  calculate(acoInput: AcoInput):Observable<any>{
    return  this.httpClient.post(this.URL + 'calculate',acoInput,
      { headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

}
