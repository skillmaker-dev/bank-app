import { Component, Input } from '@angular/core';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent {

  @Input() customer?: Customer;

  
}
