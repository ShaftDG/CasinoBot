import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

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

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}


