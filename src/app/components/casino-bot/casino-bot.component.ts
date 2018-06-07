import {Component, Input, OnInit} from '@angular/core';
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-casino-bot',
  templateUrl: './casino-bot.component.html',
  styleUrls: ['./casino-bot.component.css']
})
export class CasinoBotComponent implements OnInit {
  title = 'CasinoBot 1.3.1';

  //variables General Stage1
  selectedValueGameGeneralStage1: string;
  gamesGeneralStage1 = [
    {value: 'blackjack-0', viewValue: 'Blackjack'},
    {value: 'roulette-1', viewValue: 'Roulette'},
    {value: 'slot-2', viewValue: 'Slot'}
  ];
  selectedValueProviderGeneralStage1: string;
  providersGeneralStage1 = [
    {value: 'parimatch9087-0', viewValue: 'parimatch9087'},
    {value: 'parimatch9086-1', viewValue: 'parimatch9086'},
    {value: 'parimatch4125-2', viewValue: 'parimatch4125'},
    {value: 'pankasyno4125-3', viewValue: 'pankasyno4125'}
  ];

  //variables Blackjack Stage1
  selectedValueProviderBlackjackStage1: string;
  providersBlackjackStage1 = [
    {value: 'parimatch9087-0', viewValue: 'parimatch9087'},
    {value: 'parimatch9086-1', viewValue: 'parimatch9086'},
    {value: 'parimatch4125-2', viewValue: 'parimatch4125'},
    {value: 'pankasyno4125-3', viewValue: 'pankasyno4125'}
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isMoneyGame:boolean = false;
  isAutoPlay:boolean = false;
  isStage1:boolean = false;
  isForceStage2:boolean = false;

  constructor() {
  }

  ngOnInit() {
  }
  ngOnUpdate() {
    console.log("selectedValueGameGeneralStage1",this.selectedValueGameGeneralStage1);
    console.log("selectedValueProviderGeneralStage1",this.selectedValueProviderGeneralStage1);
    console.log("selectedValueProviderBlackjackStage1",this.selectedValueProviderBlackjackStage1);
    console.log("isMoneyGame",this.isMoneyGame);
    console.log("isAutoPlay",this.isAutoPlay);
    console.log("isStage1",this.isStage1);
    console.log("isForceStage2",this.isForceStage2);
  }

}

export interface PeriodicElement {
  name: string;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: '1', value: '5,10,7'},
  {name: '2', value: '3,8,9'},
  {name: '3', value: '6,4,5'},
  {name: '4', value: '2,5,2'},
  {name: '5', value: '5,3,5'},
  {name: '6', value: '7,8,8'},
  {name: '7', value: '9,4,7'},
  {name: '8', value: '5,9,4'}
];
