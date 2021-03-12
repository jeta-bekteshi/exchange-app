import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { CurrencyModel } from '../models/currency.model';
import { DATES } from '../models/dates';
import { DateOptionModel } from '../models/date-option.model';

@Component({
  selector: 'app-historical-rates',
  templateUrl: './historical-rates.component.html',
  styleUrls: ['./historical-rates.component.scss']
})
export class HistoricalRatesComponent implements OnInit {
  currencies: CurrencyModel[];
  rates: CurrencyModel[];
  selectedCurrency: CurrencyModel = {code: 'EUR', name: 'Euro'};

  options: DateOptionModel[] = [];
  selectedOption: string;

  constructor(private currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    this.setDateOptions();
    this.getCurrencies();
    this.getHistoricalRates();
  }

  private setDateOptions(): void {
    this.options = DATES;
    this.selectedOption = this.options[0].date;
  }

  private getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(currencies => {
      if (currencies) {
        this.currencies = currencies;
      }
    });
  }

  private getHistoricalRates(): void {
    const code = this.selectedCurrency.code;
    const date = this.selectedOption;
    this.currencyService.getHistoricalRates(code, date).subscribe(rates => {
      if (rates) {
        this.rates = rates;
      }
    });
  }

  changeSelectedCurrency($event: CurrencyModel): void {
    this.selectedCurrency = $event;
    this.getHistoricalRates();
  }

  changeSelectedOption($event: string): void {
    this.selectedOption = $event;
    this.getHistoricalRates();
  }
}

