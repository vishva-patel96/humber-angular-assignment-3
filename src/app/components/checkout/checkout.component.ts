import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isSubmitted = false;
  countries: any = ['Canada','USA'];

  checkoutFormGroup: FormGroup = new FormGroup({
      firstName:  new FormControl('', Validators.required),
      lastName:  new FormControl('',Validators.required),
      address:  new FormControl('',Validators.required),
      city:  new FormControl('',Validators.required),
      postalCode:  new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      country:  new FormControl(''),
      card:  new FormControl('', Validators.required),
      creditCardNumber:  new FormControl('', Validators.required),
      expiry:  new FormControl('', Validators.required),
      cvc:  new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nameOfCard:  new FormControl('', Validators.required)
    });

  constructor() { }

  ngOnInit(): void {
  }

  checkOutCart(){

  }

}
