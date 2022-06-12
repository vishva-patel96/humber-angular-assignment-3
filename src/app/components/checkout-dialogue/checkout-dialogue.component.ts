import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  orderNumber: string;
  total: string;
}

@Component({
  selector: 'checkout-dialogue',
  templateUrl: './checkout-dialogue.component.html',
  styleUrls: ['./checkout-dialogue.component.scss']
})
export class CheckoutDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckoutDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

  onNoClick() {
    console.log('Dialogue button is working !!!');
    this.dialogRef.close();
  }

}
