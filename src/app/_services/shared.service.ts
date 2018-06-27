import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SharedService {
  @Output() showBot: EventEmitter<any> = new EventEmitter();

  constructor() {
    // console.log('shared service started');
  }

  change(item: boolean) {
    // console.log('change started');
    this.showBot.emit(item);
  }

  getEmittedValue() {
    return this.showBot;
  }

}
