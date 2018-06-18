import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject, Optional, Host } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  Blackjack,
  CasinoBot,
  ElementOfBetting,
  ElementRoulette,
  OptionsElementsRoulette, Roulette,
  SetNumbersRouletteStage1
} from '../../casino-bot';
import { CasinoBotService } from '../../casino-bot.service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit {

  @Input() roulette: Roulette;
  @Output() rouletteChange = new EventEmitter<Roulette>();
  onRouletteChange(model: Roulette){
    this.roulette = model;
    this.rouletteChange.emit(model);
  }

  //table
  displayedColumns = ['setNumbers', 'bets', 'sessionBet', 'actions'];
  pageSize = 5;
  dataSourceRoulette: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  index: number;
  setNumbers: string;
  dataDialog: DataDialog;

  constructor(public dialog: MatDialog) { }

  // add Bet
  addItem() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: this.dataDialog,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log(result.dataElementRoulette.setNumbers);
        let setNs = result.dataElementRoulette.setNumbers.toString();
        result.dataElementRoulette.setNumbers = setNs;
        const foundIndex = this.dataSourceRoulette.data.findIndex(x => x.setNumbers === setNs);
        if (foundIndex === -1 ||
          setNs === 'split' ||
          setNs === 'fourOfKind' ||
          setNs === 'sixLine'
        ) {
            this.dataSourceRoulette.data.push(result.dataElementRoulette);
        } else {
            this.dataSourceRoulette.data.splice(foundIndex, 1, result.dataElementRoulette);
        }
        this.onRouletteChange(this.roulette);
        this.refreshTable();

        this.dataDialog = {
          dataElementRoulette: {
            setNumbers: '',
            bets: undefined,
            sessionBet: false
          },
          selectValue: this.roulette.setNumbersRouletteStage1
        }
      }
    });
  }

  // add Bet
  editItem(index: number, setNumbers: string, bets: number, sessionBet: boolean) {
    this.dataDialog.dataElementRoulette = {
        setNumbers: setNumbers,
        bets: bets,
        sessionBet: sessionBet
    };
    this.index = index;
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: this.dataDialog,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result.dataElementRoulette.setNumbers);
        let setNs = result.dataElementRoulette.setNumbers.toString();
        result.dataElementRoulette.setNumbers = setNs;
        const foundIndex = this.dataSourceRoulette.data.findIndex(x => x.setNumbers === setNs);
        this.dataSourceRoulette.data.splice(this.index, 1, result.dataElementRoulette);
        console.log(setNs);
        if ( // setNs !== 'split' ||
             setNs !== 'fourOfKind' // ||
            /* setNs !== 'sixLine'*/ ) {
          if (foundIndex !== this.index) {
            this.dataSourceRoulette.data.splice(foundIndex, 1);
          }
        }
        this.onRouletteChange(this.roulette);
        this.refreshTable();

        this.dataDialog = {
          dataElementRoulette: {
            setNumbers: '',
            bets: undefined,
            sessionBet: false
          },
          selectValue: this.roulette.setNumbersRouletteStage1
        }
      }
    });
  }

  // delete item
  deleteItem( index: number, setNumbers: string ) {
    this.index = index;
    this.setNumbers = setNumbers;
    // for delete we use splice in order to remove single object from DataService
    this.dataSourceRoulette.data.splice(this.index, 1);
    this.onRouletteChange(this.roulette);
    this.refreshTable();
  }

  // delete all items
  deleteAllItems() {
    this.dataSourceRoulette.data.splice(0, this.dataSourceRoulette.data.length);
    this.onRouletteChange(this.roulette);
    this.refreshTable();
  }

  private refreshTable() {
      if (this.dataSourceRoulette.paginator.pageIndex === 0) {
        this.dataSourceRoulette.paginator.nextPage();
        this.dataSourceRoulette.paginator.previousPage();
      } else {
        this.dataSourceRoulette.paginator.previousPage();
        this.dataSourceRoulette.paginator.nextPage();
      }
    this.dataSourceRoulette.paginator = this.paginator;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOptionsRoulette, {
      width: '515px',
      data: this.roulette.dataOptionsRoulette,
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.roulette.dataOptionsRoulette = result;
      this.onRouletteChange(this.roulette);
    });
  }

  ngOnInit() {
    this.dataSourceRoulette = new MatTableDataSource<ElementRoulette>(this.roulette.ELEMENT_DATA_ROULETTE);
    this.dataSourceRoulette.paginator = this.paginator;
    this.dataDialog = {
      dataElementRoulette: {
        setNumbers: '',
        bets: undefined,
        sessionBet: false
      },
      selectValue: this.roulette.setNumbersRouletteStage1
    }
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

export interface DataDialog {
  dataElementRoulette: ElementRoulette;
  selectValue: SetNumbersRouletteStage1[];
}
