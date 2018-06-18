import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import {
  Blackjack, CasinoBot,
  ElementOfBetting,
  ElementOfMainTable,
  ElementRoulette,
  General, Roulette
} from './casino-bot';
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
  general: General;

  //variables Blackjack Stage1
  blackjack: Blackjack;

  //variables Roulette Stage1
  roulette: Roulette;

  constructor(private serv: CasinoBotService) {
    //this.casinoBots = new Array<CasinoBot>();
  }

  ngOnInit() {
   // this.loadUsers();
    this.casinoBot = this.serv.getBot();
    //variables General Stage1
    this.general = this.casinoBot.stage1.general;

    //variables Blackjack Stage1
    this.blackjack = this.casinoBot.stage1.blackjack;

    //variables Roulette Stage1
    this.roulette = this.casinoBot.stage1.roulette;
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

    // console.log("dataSourceBettingOfPlayers",this.dataSourceBettingOfPlayers.data);

    // console.log("dataSourceRoulette",this.dataSourceRoulette.data);
    console.log("roulette",this.casinoBot.stage1.roulette);
  }
}
