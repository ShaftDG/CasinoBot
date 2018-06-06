import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  displayedColumns = ['name', 'value'];
  dataSource = ELEMENT_DATA;


  selectedValueProviders: string;

  providers = [
    {value: 'parimatch9087-0', viewValue: 'parimatch9087'},
    {value: 'parimatch9086-1', viewValue: 'parimatch9086'},
    {value: 'parimatch4125-2', viewValue: 'parimatch4125'},
    {value: 'pankasyno4125-3', viewValue: 'pankasyno4125'}
  ];
  constructor() { }

  ngOnInit() {
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
  {name: '3', value: '6,4,5'},
  {name: '3', value: '6,4,5'},
  {name: '4', value: '5,9,4'}
];
