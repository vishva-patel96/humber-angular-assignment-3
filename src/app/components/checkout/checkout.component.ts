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

    // generate the new Order number and compute total
    const orderNumber = this.generateOrderNumber();
    const total = this.dataStoreService.getcarttotal();

    // Add the new order to the list of orders
    this.dataStoreService.addOrder(
      {
        orderNumber: orderNumber.toString(),
        total: `$${total.toString()}`
    });
    
    // Open the dialog box to show the confirmation
    const checkOutDialogRef = this.dialog.open(CheckoutDialogueComponent ,{
      width: '500px',
      data: {
        orderNumber: orderNumber,
        total: `$${total}`
      }
    })

    /**
     * Clear the cart after closing the confirmation dialog
     */
    checkOutDialogRef.afterClosed().subscribe(result => {
      this.dataStoreService.clearCart();
    });
  }

  /**
   * Helper function to compute ramdom 10 digit order number.
   * @returns number
   */
  generateOrderNumber(): number {
    let orderNumber = Math.floor(Math.random() * 10000000000);
    return orderNumber;
  }

  }
