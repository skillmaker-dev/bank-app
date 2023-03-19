import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
const API_URL = 'http://localhost:3000/customers';

@Injectable({
  providedIn: 'root'
})

export class CustomersService {

  constructor(private http : HttpClient) { 

  }

  getAllCustomers() : Observable<Customer[]>
  {
    return this.http.get<Customer[]>(API_URL);
  }

  getCustomerById(id : string) : Observable<Customer>
  {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }

  deleteCustomerById(id : string) : Observable<Customer>
  {
    return this.http.delete<Customer>(`${API_URL}/${id}`);
  }
}
