import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { CasinoBot, ElementOfBetting, ElementOfMainTable } from './casino-bot';
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
  dataSource: any;
  isMoneyGame: any;
  isAutoPlay: any;
  isStage1: any;
  isForceStage2: any;

  //Options
  dataOptions: any;
  //betting of players
  dataSourceBettingOfPlayers: any;

  constructor(private serv: CasinoBotService) {
    //this.casinoBots = new Array<CasinoBot>();
  }

  ngOnInit() {
   // this.loadUsers();
    this.casinoBot = this.serv.getUsers();
    //variables General Stage1
    this.selectedValueGameGeneralStage1 = this.casinoBot.stage1.selectedValueGameGeneralStage1;
    this.gamesGeneralStage1 = this.casinoBot.stage1.gamesGeneralStage1;
    this.selectedValueProviderGeneralStage1 = this.casinoBot.stage1.selectedValueProviderGeneralStage1;
    this.providersGeneralStage1 = this.casinoBot.stage1.providersGeneralStage1;

    //variables Blackjack Stage1
    this.selectedValueProviderBlackjackStage1 = this.casinoBot.stage1.selectedValueProviderBlackjackStage1
    this.providersBlackjackStage1 = this.casinoBot.stage1.providersBlackjackStage1;
    this.dataSource = new MatTableDataSource<ElementOfMainTable>(this.casinoBot.stage1.ELEMENT_DATA_MAIN);
    this.isMoneyGame = this.casinoBot.stage1.isMoneyGame;
    this.isAutoPlay = this.casinoBot.stage1.isAutoPlay;
    this.isStage1 = this.casinoBot.stage1.isStage1;
    this.isForceStage2 = this.casinoBot.stage1.isForceStage2;

    //Options
    this.dataOptions = this.casinoBot.stage1.dataOptions;
    //betting of players
    this.dataSourceBettingOfPlayers = new MatTableDataSource<ElementOfBetting>(this.casinoBot.stage1.ELEMENT_DATA_BETTING);
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
    console.log("isMoneyGame",this.isMoneyGame);
    console.log("isAutoPlay",this.isAutoPlay);
    console.log("isStage1",this.isStage1);
    console.log("isForceStage2",this.isForceStage2);*/

    //console.log("dataOptions",this.dataOptions);
    console.log("dataSourceBettingOfPlayers",this.dataSourceBettingOfPlayers.data);
  }
}
