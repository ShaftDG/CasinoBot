import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject, Optional, Host } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CasinoBot, ElementRoulette, OptionsElementsRoulette } from '../../casino-bot';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit {
  //inputs
  @Input() numberSet: number;
  @Output() numberSetChange = new EventEmitter<number>();
  onNumberSetChange(model: number){
    this.numberSet = model;
    this.numberSetChange.emit(model);
  }

  @Input() betSet: number;
  @Output() betSetChange = new EventEmitter<number>();
  onBetSetChange(model: number){
    this.betSet = model;
    this.betSetChange.emit(model);
  }

  @Input() betNumbers: number;
  @Output() betNumbersChange = new EventEmitter<number>();
  onBetNumbersChange(model: number){
    this.betNumbers = model;
    this.betNumbersChange.emit(model);
  }

  //checkboxes
  @Input() isMoneyGameRoulette:boolean;
  @Output() isMoneyGameRouletteChange = new EventEmitter<boolean>();
  onMoneyGameRouletteChange(model: boolean){
    this.isMoneyGameRoulette = model;
    this.isMoneyGameRouletteChange.emit(model);
  }

  @Input() isStage1Roulette:boolean;
  @Output() isStage1RouletteChange = new EventEmitter<boolean>();
  onStage1RouletteChange(model: boolean){
    this.isStage1Roulette = model;
    this.isStage1RouletteChange.emit(model);
  }
  @Input() isForceStage2Roulette:boolean;
  @Output() isForceStage2RouletteChange = new EventEmitter<boolean>();
  onForceStage2RouletteChange(model: boolean){
    this.isForceStage2Roulette = model;
    this.isForceStage2RouletteChange.emit(model);
  }

  //select
  @Input() variantRoulette = [];
  @Input() selectedVariantRouletteRouletteStage1: string;
  @Output() selectedVariantRouletteRouletteStage1Change = new EventEmitter<string>();
  onVariantRouletteRouletteStage1Change(model: string){
    this.selectedVariantRouletteRouletteStage1 = model;
    this.selectedVariantRouletteRouletteStage1Change.emit(model);
  }

  @Input() setNumbersRouletteStage1 = [];
  @Input() selectedSetNumbersRouletteStage1: string;
  @Output() selectedSetNumbersRouletteStage1Change = new EventEmitter<string>();
  onSetNumbersRouletteStage1Change(model: string){
    this.selectedSetNumbersRouletteStage1 = model;
    this.selectedSetNumbersRouletteStage1Change.emit(model);
  }

  //table
  displayedColumns = ['setNumbers', 'bets', 'sessionBet'];
  pageSize = 5;
  @Input() dataSourceRoulette;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //options
  @Input() dataOptionsRoulette: OptionsElementsRoulette;
  @Output() dataOptionsRouletteChange = new EventEmitter<OptionsElementsRoulette>();
  onDataOptionsRouletteChange(model: OptionsElementsRoulette){
    this.dataOptionsRoulette = model;
    this.dataOptionsRouletteChange.emit(model);
  }

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOptionsRoulette, {
      width: '515px',
      data: this.dataOptionsRoulette,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onDataOptionsRouletteChange(result);
    });
  }

  ngOnInit() {
    this.dataSourceRoulette.paginator = this.paginator;
  }

}

@Component({
  selector: 'dialog-options-roulette',
  templateUrl: './dialog-options-roulette.component.html',
  styleUrls: ['./dialog-options-roulette.component.css']
})
export class DialogOptionsRoulette {

  constructor(
    public dialogRef: MatDialogRef<DialogOptionsRoulette>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  /* onNoClick(): void {
     this.dialogRef.close();
   }*/

}
