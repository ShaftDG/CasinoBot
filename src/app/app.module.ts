import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { HttpClientModule }   from '@angular/common/http';

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
import { SatPopoverModule } from '@ncstate/sat-popover';

import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from './about/about.component';
import { CasinoBotComponent } from './components/casino-bot/casino-bot.component';
import { BlackjackComponent, DialogOptionsBlackjack, DialogBettingOfPlayers, InlineEditComponent } from './components/casino-bot/stage1/blackjack/blackjack.component';
import { GeneralComponent } from './components/casino-bot/stage1/general/general.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'casino-bot', component: CasinoBotComponent}
];

@NgModule({
  entryComponents: [BlackjackComponent, DialogOptionsBlackjack, DialogBettingOfPlayers],
  declarations: [
    AppComponent,
    MainComponent,
    AboutComponent,
    CasinoBotComponent,
    BlackjackComponent, DialogOptionsBlackjack, DialogBettingOfPlayers, InlineEditComponent,
    GeneralComponent
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
    SatPopoverModule,

    RouterModule.forRoot(routes)
  ],
  providers: [],
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
