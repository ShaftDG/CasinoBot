import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { General } from "../../casino-bot";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  @Input() general: General;
  @Output() generalChange = new EventEmitter<General>();
  onGeneralChange(model: General){
    this.general = model;
    this.generalChange.emit(model);
  }

  constructor() { }

  ngOnInit() {
  }

}
