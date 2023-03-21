import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../services/customers.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit{
  form : FormGroup;
  isCreate : boolean = false;
  isLoading: boolean = false;
constructor(private fb : FormBuilder, private route : ActivatedRoute,private customersService: CustomersService, private router : Router) {
  this.form = this.fb.group({
    id : '',
    firstName: '',
    lastName : '',
    gender : '',
    email: '',
    address: '',
    accountType : '',
    balance: 0
  })
}
  ngOnInit(): void
  {
    this.route.url.subscribe(url => url[0].path == 'create' ? this.isCreate = true : this.isCreate = false)
    if(!this.isCreate)
    {
      let id = this.route.snapshot.paramMap.get("id");
      this.customersService.getCustomerById(id ?? '').subscribe(customer => this.form.setValue({...customer}) );
      
      
    }
  }

onSubmit()
{
  this.isLoading = true; 
    
  if(this.isCreate)
  {
    if(this.form.valid)
    {  
      this.form.disable()
      this.customersService.createCustomer(this.form.value).subscribe(() => {this.isLoading = false; this.form.enable(); Notify.success("Customer successfully created!"); this.router.navigateByUrl("/list")});
    }
    else {
      this.isLoading = false;
      this.form.enable();
    }
  }else{
    if(this.form.valid)
    {  
      this.form.disable()
      this.customersService.updateCustomer(this.form.value).subscribe(() => {this.isLoading = false; Notify.success("Customer successfully updated!"); this.form.enable(); this.router.navigateByUrl("/list")});
    }
    else {
      this.isLoading = false;
      this.form.enable();
    }
  }
}
}
