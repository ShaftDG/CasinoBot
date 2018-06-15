import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { CasinoBot, ElementOfBetting, ElementOfMainTable, ElementRoulette } from './casino-bot';
import { CasinoBotService } from './casino-bot.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-casino-bot',
  templateUrl: './casino-bot.component.html',
  styleUrls: ['./casino-bot.component.css'],
  providers: [ CasinoBotService ]
})
export class CasinoBotComponent implements OnInit {
  title = 'CasinoBot 1.3.1';

  casinoBot: CasinoBot;
  casinoBots: Array<CasinoBot>;

  //variables General Stage1
  selectedValueGameGeneralStage1: any;
  gamesGeneralStage1: any;
  selectedValueProviderGeneralStage1: any;
  providersGeneralStage1: any;

  //variables Blackjack Stage1
  selectedValueProviderBlackjackStage1: any;
  providersBlackjackStage1: any;
  dataSourceBlackjack: any;
  isMoneyGameBlackjack: any;
  isAutoPlayBlackjack: any;
  isStage1Blackjack: any;
  isForceStage2Blackjack: any;
  dataOptionsBlackjack: any;
  dataSourceBettingOfPlayers: any;

  //variables Roulette Stage1
  selectedSetNumbersRouletteStage1: any;
  setNumbersRouletteStage1: any;
  numberSet: any;
  betSet: any;
  betNumbers: any;
  selectedVariantRouletteRouletteStage1: any;
  variantRoulette: any;
  isMoneyGameRoulette: any;
  isStage1Roulette: any;
  isForceStage2Roulette: any;
  dataOptionsRoulette: any;
  dataSourceRoulette: any;

  constructor(private serv: CasinoBotService) {
    //this.casinoBots = new Array<CasinoBot>();
  }

  ngOnInit() {
   // this.loadUsers();
    this.casinoBot = this.serv.getUsers();
    //variables General Stage1
    this.selectedValueGameGeneralStage1 = this.casinoBot.stage1.general.selectedValueGameGeneralStage1;
    this.gamesGeneralStage1 = this.casinoBot.stage1.general.gamesGeneralStage1;
    this.selectedValueProviderGeneralStage1 = this.casinoBot.stage1.general.selectedValueProviderGeneralStage1;
    this.providersGeneralStage1 = this.casinoBot.stage1.general.providersGeneralStage1;

    //variables Blackjack Stage1
    this.selectedValueProviderBlackjackStage1 = this.casinoBot.stage1.blackjack.selectedValueProviderBlackjackStage1
    this.providersBlackjackStage1 = this.casinoBot.stage1.blackjack.providersBlackjackStage1;
    this.dataSourceBlackjack = new MatTableDataSource<ElementOfMainTable>(this.casinoBot.stage1.blackjack.ELEMENT_DATA_MAIN);
    this.isMoneyGameBlackjack = this.casinoBot.stage1.blackjack.isMoneyGameBlackjack;
    this.isAutoPlayBlackjack = this.casinoBot.stage1.blackjack.isAutoPlayBlackjack;
    this.isStage1Blackjack = this.casinoBot.stage1.blackjack.isStage1Blackjack;
    this.isForceStage2Blackjack = this.casinoBot.stage1.blackjack.isForceStage2Blackjack;
    this.dataOptionsBlackjack = this.casinoBot.stage1.blackjack.dataOptionsBlackjack;
    this.dataSourceBettingOfPlayers = new MatTableDataSource<ElementOfBetting>(this.casinoBot.stage1.blackjack.ELEMENT_DATA_BETTING);

    //variables Roulette Stage1
    this.selectedSetNumbersRouletteStage1 = this.casinoBot.stage1.roulette.selectedSetNumbersRouletteStage1;
    this.setNumbersRouletteStage1 = this.casinoBot.stage1.roulette.setNumbersRouletteStage1;
    this.numberSet = this.casinoBot.stage1.roulette.numberSet;
    this.betSet = this.casinoBot.stage1.roulette.betSet;
    this.betNumbers = this.casinoBot.stage1.roulette.betNumbers;
    this.selectedVariantRouletteRouletteStage1 = this.casinoBot.stage1.roulette.selectedVariantRouletteRouletteStage1;
    this.variantRoulette = this.casinoBot.stage1.roulette.variantRoulette;
    this.isMoneyGameRoulette = this.casinoBot.stage1.roulette.isMoneyGameRoulette;
    this.isStage1Roulette = this.casinoBot.stage1.roulette.isStage1Roulette;
    this.isForceStage2Roulette = this.casinoBot.stage1.roulette.isForceStage2Roulette;
    this.dataOptionsRoulette = this.casinoBot.stage1.roulette.dataOptionsRoulette;
    this.dataSourceRoulette = new MatTableDataSource<ElementRoulette>(this.casinoBot.stage1.roulette.ELEMENT_DATA_ROULETTE);
  }

  //загрузка бота
/*   private loadUsers() {
    this.serv.getUsers().subscribe((data: CasinoBot[]) => {
      this.casinoBots = data;
    });
  }*/

  ngOnUpdate() {
   /* console.log("selectedValueGameGeneralStage1",this.selectedValueGameGeneralStage1);
    console.log("selectedValueProviderGeneralStage1",this.selectedValueProviderGeneralStage1);
    console.log("selectedValueProviderBlackjackStage1",this.selectedValueProviderBlackjackStage1);
    */
  /*  console.log("isMoneyGameBlackjack",this.isMoneyGameBlackjack);
    console.log("isAutoPlayBlackjack",this.isAutoPlayBlackjack);
    console.log("isStage1Blackjack",this.isStage1Blackjack);
    console.log("isForceStage2Blackjack",this.isForceStage2Blackjack);*/

    /*console.log("isMoneyGameRoulette",this.isMoneyGameRoulette);
    console.log("isStage1Roulette",this.isStage1Roulette);
    console.log("isForceStage2Roulette",this.isForceStage2Roulette);*/

    console.log("dataSourceBettingOfPlayers",this.dataSourceBettingOfPlayers.data);

    console.log("dataSourceRoulette",this.dataSourceRoulette.data);
  }
}
