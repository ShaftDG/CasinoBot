import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject, Optional, Host } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CasinoBot, ElementOfBetting, ElementOfMainTable, OptionsElementsBlackjack } from '../../casino-bot';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

 //checkboxes
  @Input() isMoneyGameBlackjack:boolean;
  @Output() isMoneyGameBlackjackChange = new EventEmitter<boolean>();
  onMoneyGameBlackjackChange(model: boolean){
    this.isMoneyGameBlackjack = model;
    this.isMoneyGameBlackjackChange.emit(model);
  }
  @Input() isAutoPlayBlackjack:boolean;
  @Output() isAutoPlayBlackjackChange = new EventEmitter<boolean>();
  onAutoPlayBlackjackChange(model: boolean){
    this.isAutoPlayBlackjack = model;
    this.isAutoPlayBlackjackChange.emit(model);
  }
  @Input() isStage1Blackjack:boolean;
  @Output() isStage1BlackjackChange = new EventEmitter<boolean>();
  onStage1BlackjackChange(model: boolean){
    this.isStage1Blackjack = model;
    this.isStage1BlackjackChange.emit(model);
  }
  @Input() isForceStage2Blackjack:boolean;
  @Output() isForceStage2BlackjackChange = new EventEmitter<boolean>();
  onForceStage2BlackjackChange(model: boolean){
    this.isForceStage2Blackjack = model;
    this.isForceStage2BlackjackChange.emit(model);
  }

  //select
  @Input() providersBlackjackStage1 = [];
  @Input() selectedValueProviderBlackjackStage1: string;
  @Output() selectedValueProviderBlackjackStage1Change = new EventEmitter<string>();
  onProviderChange(model: string){
    this.selectedValueProviderBlackjackStage1 = model;
    this.selectedValueProviderBlackjackStage1Change.emit(model);
  }

  //table
  displayedColumns = ['name', 'value'];
  pageSize = 5;
  @Input() dataSourceBlackjack;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //options
  @Input() dataOptionsBlackjack: OptionsElementsBlackjack;
  @Output() dataOptionsBlackjackChange = new EventEmitter<OptionsElementsBlackjack>();
  onDataOptionsBlackjackChange(model: OptionsElementsBlackjack){
    this.dataOptionsBlackjack = model;
    this.dataOptionsBlackjackChange.emit(model);
  }

  //table
  displayedColumnsBettingOfplayers = ['item', 'player', 'bet'];
  pageSizeBetting = 3;
  @Input() dataSourceBettingOfPlayers;
  @Output() dataSourceBettingOfPlayersChange = new EventEmitter<ElementOfBetting>();
  onDataSourceBettingOfPlayersChange(model: ElementOfBetting){
    this.dataSourceBettingOfPlayers = model;
    this.dataSourceBettingOfPlayersChange.emit(model);
  }
  constructor(public dialog: MatDialog, public dialogBetting: MatDialog) {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOptionsBlackjack, {
      width: '515px',
      data: this.dataOptionsBlackjack,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onDataOptionsBlackjackChange(result);
    });
  }

  openDialogBettingOfPlayers(): void {
    let dialogRef = this.dialogBetting.open(DialogBettingOfPlayers, {
      width: '400px',
      data: { dataSource: this.dataSourceBettingOfPlayers,
              nameColumn: this.displayedColumnsBettingOfplayers,
              pageSize: this.pageSizeBetting },
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onDataSourceBettingOfPlayersChange(result.dataSource);
    });
  }

  ngOnInit() {
    this.dataSourceBlackjack.paginator = this.paginator;
  }

}

@Component({
  selector: 'dialog-options-blackjack',
  templateUrl: './dialog-options-blackjack.component.html',
  styleUrls: ['./dialog-options-blackjack.component.css']
})
export class DialogOptionsBlackjack {
  constructor(
    public dialogRef: MatDialogRef<DialogOptionsBlackjack>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
  selector: 'dialog-betting-of-players',
  templateUrl: './dialog-betting-of-players.component.html',
  styleUrls: ['./dialog-betting-of-players.component.css']
})
export class DialogBettingOfPlayers {
  selection = new SelectionModel<ElementOfBetting>(true, []);

  constructor(
    public dialogRef1: MatDialogRef<DialogBettingOfPlayers>,
    @Inject(MAT_DIALOG_DATA) public dataBetting: any) { }

    dt: any;
  ngOnInit() {
    this.dt = new BettingDataSource(this.dataBetting.dataSource.data);
  }

  update(el: ElementOfBetting, bet: number) {
    if (bet == null) { return; }
    // copy and mutate
    const copy = this.dt.data().slice()
    el.bet = bet;
    this.dt.update(copy);
  }
  /* onNoClick(): void {
     this.dialogRef.close();
   }*/

}

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss']
})
export class InlineEditComponent {

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
