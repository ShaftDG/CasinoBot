import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Slots } from '../../casino-bot';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {

  @Input() slots: Slots;
  @Output() slotsChange = new EventEmitter<Slots>();
  onSlotsChange(model: Slots) {
    this.slots = model;
    this.slotsChange.emit(model);
  }

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOptionsSlotsComponent, {
      width: '515px',
      data: this.slots.dataOptionsSlots,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.slots.dataOptionsSlots = result;
      this.onSlotsChange(this.slots);
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-dialog-options-slots',
  templateUrl: './dialog-options-slots.component.html',
  styleUrls: ['./dialog-options-slots.component.css']
})
export class DialogOptionsSlotsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
}
