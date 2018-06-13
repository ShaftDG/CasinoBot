import {MatTableDataSource} from "@angular/material";

export class CasinoBot{
  constructor(
    public stage1: Stage1/*,
    public stage2: Stage2*/) { }
}

export interface Stage1 {
  selectedValueGameGeneralStage1: string;
  gamesGeneralStage1: GamesGeneralStage1[];
  selectedValueProviderGeneralStage1: string;
  providersGeneralStage1: ProvidersGeneralStage1[];
  selectedValueProviderBlackjackStage1: string;
  providersBlackjackStage1: ProvidersBlackjackStage1[];
  ELEMENT_DATA_MAIN: ElementOfMainTable[];
  isMoneyGame: boolean;
  isAutoPlay: boolean;
  isStage1: boolean;
  isForceStage2: boolean;
  dataOptions: OptionsElements;
  ELEMENT_DATA_BETTING: ElementOfBetting[];
}

export interface GamesGeneralStage1 {
  value: string;
  viewValue: string;
}

export interface ProvidersGeneralStage1 {
  value: string;
  viewValue: string;
}

export interface ProvidersBlackjackStage1 {
  value: string;
  viewValue: string;
}

export interface ElementOfMainTable {
  name: string;
  value: string;
}

export interface ElementOfBetting {
  item: string;
  player: boolean;
  bet: number;
}

export interface OptionsElements {
  amountOfReplenishment: number;
  maxCountGamesStage1: number;
  maxWinGamesStage1: number;
  maxBalanceStage1: number;
  maxWinGamesStage2: number;
  maxBalanceStage2: number;
}
