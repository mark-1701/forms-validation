import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

interface Customer {
  id: string;
  name: string;
  email: string;
  age: string;
}

function generateUniqueKey() {
  const timestamp: number = Date.now();
  const randomNum: number = Math.floor(Math.random() * 1000000);
  return `${timestamp}${randomNum}`;
}

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {
  customerList: Customer[] = [];

  // constructor
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    this.customerList = JSON.parse(localStorage?.getItem('customers') || '[]');
  }

  // customerForm
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required])
  });

  // guardar clientes
  saveCustomer() {
    let customer: Customer = {
      id: generateUniqueKey(),
      name: this.customerForm.value.name || '',
      email: this.customerForm.value.email || '',
      age: this.customerForm.value.age || ''
    };
    if (!this.customerForm.valid) return alert('Todavía hay datos no válidos.');
    if (!localStorage.getItem('customers')) {
      localStorage.setItem('customers', JSON.stringify([customer]));
    } else {
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      const newCustomers = [...customers, customer];
      localStorage.setItem('customers', JSON.stringify(newCustomers));
    }
    window.location.reload();
  }

  // eliminar cliente
  deleteCustomer(index: string) {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const updatedCustomerData = customers.filter((customer: Customer) => customer.id !== index);
    localStorage.setItem('customers', JSON.stringify(updatedCustomerData));
    window.location.reload();
  }

  // generar id unico
  generateUniqueKey() {
    const timestamp: number = Date.now();
    const randomNum: number = Math.floor(Math.random() * 1000000);
    return `${timestamp}${randomNum}`;
  }
}
