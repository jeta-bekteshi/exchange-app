import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrentRatesComponent } from './current-rates/current-rates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoricalRatesComponent } from './historical-rates/historical-rates.component';
import { MatButtonModule } from '@angular/material/button';
import { RatesTableComponent } from './components/rates-table/rates-table.component';
import { MatInputModule } from '@angular/material/input';
import { CurrencyOptionsComponent } from './components/currency-options/currency-options.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    CurrentRatesComponent,
    HistoricalRatesComponent,
    RatesTableComponent,
    CurrencyOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
