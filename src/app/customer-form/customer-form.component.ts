import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  form : FormGroup;
  isCreate : boolean = false;
  isLoading: boolean = false;
constructor(private fb : FormBuilder) {
  this.form = this.fb.group({
    id : '',
    firstname: '',
    lastname : '',
    gender : '',
    email: '',
    address: '',
  })
}

onSubmit()
{
  
}
}
