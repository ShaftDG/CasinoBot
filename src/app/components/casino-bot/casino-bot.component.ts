import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CasinoBot, Blackjack, General, Roulette, Slots } from '../../_models/casino-bot';
import { CasinoBotService } from '../../_services/casino-bot.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SharedService } from '../../_services/shared.service';
@Component({
  selector: 'app-casino-bot',
  templateUrl: './casino-bot.component.html',
  styleUrls: ['./casino-bot.component.css'],
  providers: [ CasinoBotService ]
})
export class CasinoBotComponent implements OnInit {
  title = 'CasinoBot 1.3.1';

  id: string = '';


  bots: any;
  casinoBot: any;

  // variables General Stage1
  general: General;

  // variables Blackjack Stage1
  blackjack: Blackjack;

  // variables Roulette Stage1
  roulette: Roulette;

  // variables Slots Stage1
  slots: Slots;
  isLoadingResults = true;

  ss: any;

  constructor(private serv: CasinoBotService,
              private router: Router, private route: ActivatedRoute,
              ss: SharedService) {
    this.ss = ss;
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      let id = params['id'];
      this.serv.getCasinoBot(id)
        .subscribe(res => {
          // console.log(res);
          this.casinoBot = res;
          this.general = this.casinoBot.stage1.general;
          this.blackjack = this.casinoBot.stage1.blackjack;
          this.roulette = res.stage1.roulette;
          this.slots = this.casinoBot.stage1.slots;

          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = true;
        });
    });
  }

  updateCasinoBots() {
    this.serv.updateCasinoBot(this.casinoBot._id, this.casinoBot)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/casino-bot', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  deleteCasinoBot() {
    this.serv.deleteCasinoBot(this.casinoBot._id)
      .subscribe(res => {
          this.router.navigate(['']);
          this.ss.change(false);
        }, (err) => {
          console.log(err);
        }
      );
  }
  /*
    createCasinoBot() {
      this.serv.postCasinoBot(this.serv.getBot())
        .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/casino-bot'/!*, id*!/]);
        }, (err) => {
          console.log(err);
        });
    }*/

  ngOnUpdate() {
    console.log('casinoBot', this.casinoBot);
  }
}
