import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  @Input() gamesGeneralStage1 = [];

  @Input() providersGeneralStage1 = [];

  @Input() selectedValueGameGeneralStage1: string;
  @Output() selectedValueGameGeneralStage1Change = new EventEmitter<string>();
  onGameChange(model: string){
    this.selectedValueGameGeneralStage1 = model;
    this.selectedValueGameGeneralStage1Change.emit(model);
  }

  @Input() selectedValueProviderGeneralStage1: string;
  @Output() selectedValueProviderGeneralStage1Change = new EventEmitter<string>();
  onProviderChange(model: string){
    this.selectedValueProviderGeneralStage1 = model;
    this.selectedValueProviderGeneralStage1Change.emit(model);
  }

  constructor() { }

  ngOnInit() {
  }

}
