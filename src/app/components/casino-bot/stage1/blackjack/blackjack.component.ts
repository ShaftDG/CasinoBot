import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject, Optional, Host } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ElementOfBetting, ElementOfMainTable, Blackjack } from '../../casino-bot';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  displayedColumns: string[];
  pageSize: number;
  dataSourceBlackjack: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumnsBettingOfplayers: string[];
  pageSizeBetting: number;
  dataSourceBettingOfPlayers: any;

  @Input() blackjack: Blackjack;
  @Output() blackjackChange = new EventEmitter<Blackjack>();
  onBlackjackChange(model: Blackjack) {
    this.blackjack = model;
    this.blackjackChange.emit(model);
  }

  constructor(public dialog: MatDialog, public dialogBetting: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOptionsBlackjackComponent, {
      width: '515px',
      data: this.blackjack.dataOptionsBlackjack,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.blackjack.dataOptionsBlackjack = result;
      this.onBlackjackChange(this.blackjack);
    });
  }

  openDialogBettingOfPlayers(): void {
    const dialogRef = this.dialogBetting.open(DialogBettingOfPlayersComponent, {
      width: '400px',
      data: { dataSource: this.dataSourceBettingOfPlayers,
              nameColumn: this.displayedColumnsBettingOfplayers,
              pageSize: this.pageSizeBetting },
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.blackjack.ELEMENT_DATA_BETTING = result.dataSource.data;
      this.onBlackjackChange(this.blackjack);
    });
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'value'];
    this.pageSize = 5;
    this.displayedColumnsBettingOfplayers = ['item', 'player', 'bet'];
    this.pageSizeBetting = 3;
    this.dataSourceBlackjack = new MatTableDataSource<ElementOfMainTable>(this.blackjack.ELEMENT_DATA_MAIN);
    this.dataSourceBettingOfPlayers = new MatTableDataSource<ElementOfBetting>(this.blackjack.ELEMENT_DATA_BETTING);
    this.dataSourceBlackjack.paginator = this.paginator;
  }

}

@Component({
  selector: 'app-dialog-options-blackjack',
  templateUrl: './dialog-options-blackjack.component.html',
  styleUrls: ['./dialog-options-blackjack.component.css']
})
export class DialogOptionsBlackjackComponent {
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

 /* onNoClick(): void {
    this.dialogRef.close();
  }*/

}

@Component({
  selector: 'app-dialog-betting-of-players',
  templateUrl: './dialog-betting-of-players.component.html',
  styleUrls: ['./dialog-betting-of-players.component.css']
})
export class DialogBettingOfPlayersComponent implements OnInit {
  selection = new SelectionModel<ElementOfBetting>(true, []);

  constructor(@Inject(MAT_DIALOG_DATA) public dataBetting: any) { }

    dt: any;
  ngOnInit() {
    this.dt = new BettingDataSource(this.dataBetting.dataSource.data);
  }

  update(el: ElementOfBetting, bet: number) {
    if (bet == null) { return; }
    // copy and mutate
    const copy = this.dt.data().slice();
    el.bet = bet;
    this.dt.update(copy);
  }
}

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent implements OnInit {

  /** Overrides the bet and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.bet = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  bet = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.bet = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.bet);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}

export class BettingDataSource extends DataSource<any> {

  private dataSubject = new BehaviorSubject<ElementOfBetting[]>([]);

  data() {
    return this.dataSubject.value;
  }

  update(data) {
    this.dataSubject.next(data);
  }

  constructor(data: any[]) {
    super();
    this.dataSubject.next(data);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ElementOfBetting[]> {
    return this.dataSubject;
  }

  disconnect() {}
}
