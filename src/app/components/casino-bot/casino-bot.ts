import {MatTableDataSource} from "@angular/material";

export class CasinoBot{
  constructor(
    public stage1: Stage1/*,
    public stage2: Stage2*/) { }
}

export interface Stage1 {
  general: General;
  blackjack: Blackjack;
  roulette: Roulette;
  slots: Slots;
}

export interface Blackjack {
  selectedValueProviderBlackjackStage1: string;
  providersBlackjackStage1: ProvidersBlackjackStage1[];
  ELEMENT_DATA_MAIN: ElementOfMainTable[];
  isMoneyGameBlackjack: boolean;
  isAutoPlayBlackjack: boolean;
  isStage1Blackjack: boolean;
  isForceStage2Blackjack: boolean;
  dataOptionsBlackjack: OptionsElementsBlackjack;
  ELEMENT_DATA_BETTING: ElementOfBetting[];
}

export interface General {
  selectedValueGameGeneralStage1: string;
  gamesGeneralStage1: GamesGeneralStage1[];
  selectedValueProviderGeneralStage1: string;
  providersGeneralStage1: ProvidersGeneralStage1[];
}
export interface Roulette {
  selectedSetNumbersRouletteStage1: string;
  setNumbersRouletteStage1: SetNumbersRouletteStage1[];
  numberSet: number;
  betSet: number;
  betNumbers: number;
  selectedVariantRouletteRouletteStage1: string;
  variantRoulette: VariantRoulette[];
  isMoneyGameRoulette: boolean;
  isStage1Roulette: boolean;
  isForceStage2Roulette: boolean;
  dataOptionsRoulette: OptionsElementsRoulette;
  ELEMENT_DATA_ROULETTE: ElementRoulette[];
}
export interface Slots {

}

export interface VariantRoulette {
  value: string;
  viewValue: string;
}

export interface SetNumbersRouletteStage1 {
  value: string;
  viewValue: string;
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

export interface ElementRoulette {
  setNumbers: string;
  bets: number;
  sessionBet: boolean;
}

export interface OptionsElementsRoulette {
  amountOfReplenishment: number;
  maxCountGamesStage0: number;
  maxWinGamesStage0: number;
  maxBalanceStage0: number;
  maxWinGamesStage1: number;
  maxBalanceStage1: number;
}

export interface OptionsElementsBlackjack {
  amountOfReplenishment: number;
  maxCountGamesStage1: number;
  maxWinGamesStage1: number;
  maxBalanceStage1: number;
  maxWinGamesStage2: number;
  maxBalanceStage2: number;
}
