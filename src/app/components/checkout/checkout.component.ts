import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/services/data-store.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CheckoutDialogueComponent } from '../checkout-dialogue/checkout-dialogue.component';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  isSubmitted:boolean = false;
  countries: string[] = ['Canada','USA'];
  cards:string[] = ['VISA', 'MasterCard']


  checkoutFormGroup: FormGroup = new FormGroup({
      firstName:  new FormControl('', Validators.required),
      lastName:  new FormControl('',Validators.required),
      address:  new FormControl('',Validators.required),
      city:  new FormControl('',Validators.required),
      postalCode:  new FormControl('', Validators.required),
      country:  new FormControl(''),
      card:  new FormControl('', Validators.required),
      creditCardNumber:  new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      // expiry:  new FormControl([Validators.required]),
      cvc:  new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      nameOnCard:  new FormControl('', Validators.required)
    });

  constructor(public dialog: MatDialog, private dataStoreService: DataStoreService) { }

  ngOnInit(): void {
  }

  checkOutCart(){
    console.log(this.checkoutFormGroup.invalid);
    const orderNumber = this.generateOrderNumber();
    const total = this.dataStoreService.getcarttotal();

    const checkOutDialogRef = this.dialog.open(CheckoutDialogueComponent ,{
      width: '500px',
      data: {
        orderNumber: orderNumber,
        total: `$${total}`
      }
    })

    checkOutDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  generateOrderNumber(): number {
    let orderNumber = Math.floor(Math.random() * 10000000000);
    return orderNumber;
  }

  }
