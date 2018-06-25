import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations;

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CasinoBotComponent } from './components/casino-bot/casino-bot.component';
import {
  BlackjackComponent,
  DialogOptionsBlackjackComponent,
  DialogBettingOfPlayersComponent,
  InlineEditComponent
} from './components/casino-bot/stage1/blackjack/blackjack.component';
import { GeneralComponent } from './components/casino-bot/stage1/general/general.component';
import { RouletteComponent, DialogOptionsRouletteComponent } from './components/casino-bot/stage1/roulette/roulette.component';
import { AddDialogComponent } from './components/casino-bot/stage1/roulette/add-dialog/add-dialog.component';
import { CasinoBotService } from './components/casino-bot/casino-bot.service';
import { SlotsComponent, DialogOptionsSlotsComponent } from './components/casino-bot/stage1/slots/slots.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'casino-bot', component: CasinoBotComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  entryComponents: [
    BlackjackComponent, DialogOptionsBlackjackComponent, DialogBettingOfPlayersComponent,
    RouletteComponent, DialogOptionsRouletteComponent, AddDialogComponent,
    SlotsComponent, DialogOptionsSlotsComponent
  ],
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    CasinoBotComponent,
    BlackjackComponent, DialogOptionsBlackjackComponent, DialogBettingOfPlayersComponent, InlineEditComponent,
    GeneralComponent,
    RouletteComponent, DialogOptionsRouletteComponent, AddDialogComponent,
    SlotsComponent, DialogOptionsSlotsComponent, HomeComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // NoopAnimationsModule,

    HttpClientModule,

    FormsModule, ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatSlideToggleModule,
    SatPopoverModule,
    MatProgressSpinnerModule,

    RouterModule.forRoot(routes)
  ],
  providers: [ AuthGuard,
               AlertService,
               AuthenticationService,
               UserService,
               CasinoBotService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;

  // Otherise, log the boot error
}).catch(err => console.error(err));
