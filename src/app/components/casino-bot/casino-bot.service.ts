import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CasinoBot,
  ElementOfBetting,
  ElementOfMainTable, ElementRoulette,
  GamesGeneralStage1,
  OptionsElementsBlackjack, OptionsElementsRoulette,
  ProvidersBlackjackStage1,
  ProvidersGeneralStage1, SetNumbersRouletteStage1, VariantRoulette,
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
                general: {
                  selectedValueGameGeneralStage1: selectedValueGameGeneralStage1,
                  gamesGeneralStage1: gamesGeneralStage1,
                  selectedValueProviderGeneralStage1: selectedValueProviderGeneralStage1,
                  providersGeneralStage1: providersGeneralStage1,
                },
                blackjack: {
                  selectedValueProviderBlackjackStage1: selectedValueProviderBlackjackStage1,
                  providersBlackjackStage1: providersBlackjackStage1,
                  isMoneyGameBlackjack: isMoneyGameBlackjack,
                  isAutoPlayBlackjack: isAutoPlayBlackjack,
                  isStage1Blackjack: isStage1Blackjack,
                  isForceStage2Blackjack: isForceStage2Blackjack,
                  dataOptionsBlackjack: dataOptionsBlackjack,
                  ELEMENT_DATA_MAIN: ELEMENT_DATA_MAIN,
                  ELEMENT_DATA_BETTING: ELEMENT_DATA_BETTING
                },
                roulette: {
                  selectedSetNumbersRouletteStage1: selectedSetNumbersRouletteStage1,
                  setNumbersRouletteStage1: setNumbersRouletteStage1,
                  numberSet: numberSet,
                  betSet: betSet,
                  betNumbers: betNumbers,
                  selectedVariantRouletteRouletteStage1: selectedVariantRouletteRouletteStage1,
                  variantRoulette: variantRoulette,
                  isMoneyGameRoulette: isMoneyGameRoulette,
                  isStage1Roulette: isStage1Roulette,
                  isForceStage2Roulette: isForceStage2Roulette,
                  dataOptionsRoulette: dataOptionsRoulette,
                  ELEMENT_DATA_ROULETTE: ELEMENT_DATA_ROULETTE,
                },
                slots: {}
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

const isMoneyGameBlackjack: boolean = false;
const isAutoPlayBlackjack: boolean = false;
const isStage1Blackjack: boolean = false;
const isForceStage2Blackjack: boolean = false;

const dataOptionsBlackjack: OptionsElementsBlackjack = {
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

//variables Roulette Stage1
const selectedSetNumbersRouletteStage1: string = 'split';
const setNumbersRouletteStage1: SetNumbersRouletteStage1[] = [
  {value: 'split-0', viewValue: 'split'},
  {value: 'fourOfKind-1', viewValue: 'fourOfKind'},
  {value: 'sixLine-2', viewValue: 'sixLine'},
  {value: 'red/black-3', viewValue: 'red/black'},
  {value: 'red-4', viewValue: 'red'},
  {value: 'black-5', viewValue: 'black'},
  {value: 'even-6', viewValue: 'even'},
  {value: 'odd-7', viewValue: 'odd'},
  {value: 'even/odd-8', viewValue: 'even/odd'},
  {value: '1/18-9', viewValue: '1/18'},
  {value: '19/36-10', viewValue: '19/36'},
  {value: '1/36-11', viewValue: '1/36'}
];
const  numberSet: number = 1;
const  betSet: number = 1;
const  betNumbers: number = 1;

const selectedVariantRouletteRouletteStage1: string = 'roulette163';
const variantRoulette: VariantRoulette[] = [
  {value: 'roulette163-0', viewValue: 'roulette163'},
  {value: 'roulette165-1', viewValue: 'roulette165'}
];
const isMoneyGameRoulette: boolean = false;
const isStage1Roulette: boolean = true;
const isForceStage2Roulette: boolean = false;
const dataOptionsRoulette: OptionsElementsRoulette = {
  amountOfReplenishment: 10.0,
  maxCountGamesStage0: 10.0,
  maxWinGamesStage0: 10.0,
  maxBalanceStage0: 10.0,
  maxWinGamesStage1: 10.0,
  maxBalanceStage1: 10.0,
};
const ELEMENT_DATA_ROULETTE: ElementRoulette[] = [];
