import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDialogueComponent } from './checkout-dialogue.component';

describe('CheckoutDialogueComponent', () => {
  let component: CheckoutDialogueComponent;
  let fixture: ComponentFixture<CheckoutDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
