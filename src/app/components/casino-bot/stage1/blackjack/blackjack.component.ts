import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject, Optional, Host } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CasinoBot, ElementOfBetting, ElementOfMainTable, OptionsElements } from '../../casino-bot';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {

 //checkboxes
  @Input() isMoneyGame:boolean;
  @Output() isMoneyGameChange = new EventEmitter<boolean>();
  onMoneyGameChange(model: boolean){
    this.isMoneyGame = model;
    this.isMoneyGameChange.emit(model);
  }
  @Input() isAutoPlay:boolean;
  @Output() isAutoPlayChange = new EventEmitter<boolean>();
  onAutoPlayChange(model: boolean){
    this.isAutoPlay = model;
    this.isAutoPlayChange.emit(model);
  }
  @Input() isStage1:boolean;
  @Output() isStage1Change = new EventEmitter<boolean>();
  onStage1Change(model: boolean){
    this.isStage1 = model;
    this.isStage1Change.emit(model);
  }
  @Input() isForceStage2:boolean;
  @Output() isForceStage2Change = new EventEmitter<boolean>();
  onForceStage2Change(model: boolean){
    this.isForceStage2 = model;
    this.isForceStage2Change.emit(model);
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
  @Input() dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //options
  @Input() dataOptions: OptionsElements;
  @Output() dataOptionsChange = new EventEmitter<OptionsElements>();
  onDataOptionsChange(model: OptionsElements){
    this.dataOptions = model;
    this.dataOptionsChange.emit(model);
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
      data: this.dataOptions,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onDataOptionsChange(result);
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
    this.dataSource.paginator = this.paginator;
  }

}

@Component({
  selector: 'dialog-options-blackjack',
  templateUrl: './dialog-options-blackjack.component.html',
  styleUrls: ['./dialog-options-blackjack.component.css']
})
export class DialogOptionsBlackjack {

  bet = '';

  constructor(
    public dialogRef: MatDialogRef<DialogOptionsBlackjack>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
  selection = new SelectionModel<boolean>(true, []);

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
