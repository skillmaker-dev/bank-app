import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  customers : Customer[] = [];
  private searchValues = new BehaviorSubject<string>('')
constructor(private customersService : CustomersService) {}

ngOnInit()
{
  this.getAllCustomers()
}

searchByName(term : string)
{
  this.searchValues.next(term);
}

getAllCustomers()
{
  this.searchValues.pipe(debounceTime(500),distinctUntilChanged()).subscribe(name =>  this.customersService.getAllCustomers().subscribe(customers => this.customers = customers.filter(p => `${p.firstName} + ${p.lastName}`.toLowerCase().includes(name.toLowerCase()))))
}

}
