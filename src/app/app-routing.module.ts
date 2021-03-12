import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentRatesComponent } from './current-rates/current-rates.component';
import { HistoricalRatesComponent } from './historical-rates/historical-rates.component';

const routes: Routes = [
  {path: '', redirectTo: '/current-rates', pathMatch: 'full'},
  {
    path: 'current-rates',
    component: CurrentRatesComponent
  },
  {
    path: 'historical-rates',
    component: HistoricalRatesComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
