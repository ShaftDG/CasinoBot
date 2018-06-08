import {Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOptionsBlackjack, {
      width: '300px',
      data: { name: this.name, animal: this.animal },
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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

  constructor(
    public dialogRef: MatDialogRef<DialogOptionsBlackjack>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
