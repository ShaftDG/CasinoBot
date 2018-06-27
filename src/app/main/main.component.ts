import { OnInit, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CasinoBotService} from '../_services/casino-bot.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ss: any;
  bots: any;
  showBot: boolean = false;

  title = 'Bots of casino games'
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private serv: CasinoBotService,
              private router: Router, private route: ActivatedRoute,
              ss: SharedService) {
    this.ss = ss;
  }

  createCasinoBot() {
    this.serv.postCasinoBot(this.serv.getBot())
      .subscribe(res => {
        this.router.navigate(['']);
        this.showBot = true;
      }, (err) => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.ss.getEmittedValue()
      .subscribe(item => this.showBot = item);

    this.serv.getCasinoBots()
      .subscribe(res => {
        this.bots = res;

        if (this.bots.length !== 0) {
          this.showBot = true;
        } else {
          this.showBot = false;
        }
      }, err => {
        console.log(err);
        this.showBot = true;
      });
  }
}
