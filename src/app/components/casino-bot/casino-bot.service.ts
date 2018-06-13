import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CasinoBot,
  ElementOfBetting,
  ElementOfMainTable,
  GamesGeneralStage1,
  OptionsElements,
  ProvidersBlackjackStage1,
  ProvidersGeneralStage1,
} from './casino-bot';
import { Observable } from 'rxjs';
import {MatTableDataSource} from "@angular/material";

@Injectable()
export class CasinoBotService{

  private url = "http://localhost:64269/api/users/";
  constructor(private http: HttpClient){ }

  getUsers(){
    return {
              stage1: {
                selectedValueGameGeneralStage1: selectedValueGameGeneralStage1,
                gamesGeneralStage1: gamesGeneralStage1,
                selectedValueProviderGeneralStage1: selectedValueProviderGeneralStage1,
                providersGeneralStage1: providersGeneralStage1,
                selectedValueProviderBlackjackStage1: selectedValueProviderBlackjackStage1,
                providersBlackjackStage1: providersBlackjackStage1,
                isMoneyGame: isMoneyGame,
                isAutoPlay: isAutoPlay,
                isStage1: isStage1,
                isForceStage2: isForceStage2,
                dataOptions: dataOptions,
                ELEMENT_DATA_MAIN: ELEMENT_DATA_MAIN,
                ELEMENT_DATA_BETTING: ELEMENT_DATA_BETTING
              }
          }
          // return this.http.get(this.url);
  }

  createUser(casinoBot: CasinoBot){
    return this.http.post(this.url, casinoBot);
  }
  updateUser(id: number, casinoBot: CasinoBot) {
    const urlParams = new HttpParams().set("id", id.toString());
    return this.http.put(this.url, casinoBot, { params: urlParams});
  }
  deleteUser(id: number){
    const urlParams = new HttpParams().set("id", id.toString());
    return this.http.delete(this.url, { params: urlParams});
  }
}

//variables General Stage1
const selectedValueGameGeneralStage1: string = 'Blackjack';
const gamesGeneralStage1: GamesGeneralStage1[] = [
  {value: 'blackjack-0', viewValue: 'Blackjack'},
  {value: 'roulette-1', viewValue: 'Roulette'},
  {value: 'slot-2', viewValue: 'Slot'}
];
const selectedValueProviderGeneralStage1: string = 'parimatch9087';
const providersGeneralStage1: ProvidersGeneralStage1[] = [
  {value: 'parimatch9087-0', viewValue: 'parimatch9087'},
  {value: 'parimatch9086-1', viewValue: 'parimatch9086'},
  {value: 'parimatch4125-2', viewValue: 'parimatch4125'},
  {value: 'pankasyno4125-3', viewValue: 'pankasyno4125'}
];

//variables Blackjack Stage1
const selectedValueProviderBlackjackStage1: string = 'parimatch9087';
const providersBlackjackStage1: ProvidersBlackjackStage1[] = [
  {value: 'parimatch9087-0', viewValue: 'parimatch9087'},
  {value: 'parimatch9086-1', viewValue: 'parimatch9086'},
  {value: 'parimatch4125-2', viewValue: 'parimatch4125'},
  {value: 'pankasyno4125-3', viewValue: 'pankasyno4125'}
];

const isMoneyGame: boolean = false;
const isAutoPlay: boolean = false;
const isStage1: boolean = false;
const isForceStage2 :boolean = false;

//Options
const dataOptions: OptionsElements = {
  amountOfReplenishment: 2.0,
  maxCountGamesStage1: 2.0,
  maxWinGamesStage1: 3.0,
  maxBalanceStage1: 4.0,
  maxWinGamesStage2: 2.0,
  maxBalanceStage2: 1.0,
};

const ELEMENT_DATA_MAIN: ElementOfMainTable[] = [
  {name: '1', value: '5,10,7'},
  {name: '2', value: '3,8,9'},
  {name: '3', value: '6,4,5'},
  {name: '4', value: '2,5,2'},
  {name: '5', value: '5,3,5'},
  {name: '6', value: '7,8,8'},
  {name: '7', value: '9,4,7'},
  {name: '8', value: '5,9,4'}
];

const ELEMENT_DATA_BETTING: ElementOfBetting[] = [
  {item: '1', player: true, bet: 1},
  {item: '2', player: false, bet: 1},
  {item: '3', player: false, bet: 1}
];
