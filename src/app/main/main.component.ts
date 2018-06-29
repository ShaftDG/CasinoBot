import { OnInit, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CasinoBotService } from '../_services/casino-bot.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../_services/shared.service';
import { MatDialog } from '@angular/material';
import { UserService } from '../_services/user.service';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  ss: any;
  bots: any;
  showBot: boolean = false;

  firstName: string;
  lastName: string;
  username: string;
  password: string;

  title = 'Bots of casino games';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private serv: CasinoBotService,
              private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
              private userService: UserService,
              ss: SharedService,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.ss = ss;
    iconRegistry.addSvgIcon(
      'exit_to_app',
      sanitizer.bypassSecurityTrustResourceUrl('assets/image/exit_to_app.svg'));
    iconRegistry.addSvgIcon(
      'register',
      sanitizer.bypassSecurityTrustResourceUrl('assets/image/register.svg'));
    iconRegistry.addSvgIcon(
      'about',
      sanitizer.bypassSecurityTrustResourceUrl('assets/image/about.svg'));
    iconRegistry.addSvgIcon(
      'menu_account',
      sanitizer.bypassSecurityTrustResourceUrl('assets/image/menu_account.svg'));
  }

  // add Bet
  userRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
      },
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.postUser(result)
          .subscribe(res => {
            this.router.navigate(['']);
          }, (err) => {
            console.log(err);
          });
      }
    });
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

    this.ngOnGetCasinoBot();

    this.ss.getEmittedValue()
      .subscribe(item => {
        this.ngOnGetCasinoBot();
      });
  }

  ngOnGetCasinoBot() {
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
