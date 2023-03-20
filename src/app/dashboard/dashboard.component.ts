import { Component, OnInit } from '@angular/core';
import { map, reduce } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private customersService : CustomersService) {}

  totalBalance: number = 0;
  numberOfCustomers: number = 0;

  ngOnInit(): void
  {
    this.getTotalBalance();
    this.getNumberOfCustomers();
  }

  getTotalBalance()
  {
    this.customersService.getAllCustomers().subscribe(c => 
      {
      this.totalBalance =  c.reduce(
        (accumulator, currentValue) => accumulator + currentValue.balance,
        0
      );
    });
  }

  getNumberOfCustomers()
  {
    this.customersService.getAllCustomers().subscribe(c => this.numberOfCustomers = c.length);
  }


}
