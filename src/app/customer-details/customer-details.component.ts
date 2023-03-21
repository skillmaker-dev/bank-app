import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  isLoading : boolean = false; 
constructor(private route : ActivatedRoute,private router : Router,private customersService : CustomersService) {}
customer? : Customer;

  ngOnInit(): void
  {
    let id : string | null = this.route.snapshot.paramMap.get('id');
    this.customersService.getCustomerById(id ?? '').subscribe(customer => this.customer = customer);

  }

  deleteCustomer()
  {
    this.isLoading = true;

    Confirm.show(
      'Delete Customer',
      'Do you really want to delete this customer ?',
      'Yes',
      'No',
      () => {
        this.customersService.deleteCustomerById(this.customer?.id ?? '').subscribe(() => {this.isLoading = false; Notify.success("Customer successfully deleted!"); this.router.navigateByUrl('/list')});
      },
      () => {
      
      },
      {
      },
      );

  }

}
