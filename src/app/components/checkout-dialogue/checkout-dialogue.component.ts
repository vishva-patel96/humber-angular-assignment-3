import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CheckoutDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit(): void {
  }

  onCloseClick() {
    this.dialogRef.close();
    this.router.navigateByUrl('products');
  }

}
