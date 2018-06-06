import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  selectedValueGame: string;

  games = [
    {value: 'blackjack-0', viewValue: 'Blackjack'},
    {value: 'roulette-1', viewValue: 'Roulette'},
    {value: 'slot-2', viewValue: 'Slot'}
  ];

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
