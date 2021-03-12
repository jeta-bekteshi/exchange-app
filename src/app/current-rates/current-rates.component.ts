import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { CurrencyModel } from '../models/currency.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-current-rates',
  templateUrl: './current-rates.component.html',
  styleUrls: ['./current-rates.component.scss']
})
export class CurrentRatesComponent implements OnInit, OnDestroy {
  currencies: CurrencyModel[];
  selectedCurrency: CurrencyModel = {code: 'EUR', name: 'Euro'};
  convertCurrencyForm: FormGroup;
  rates: CurrencyModel[];

  subscriptions: Subscription = new Subscription();

  constructor(private currencyService: CurrencyService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.setUpConversionForm();
    this.getCurrencies();
    this.getCurrentRates();
  }

  private setUpConversionForm(): void {
    this.convertCurrencyForm = this.formBuilder.group({
      from: new FormControl({code: 'EUR', name: 'Euro'}),
      to: new FormControl({code: 'USD', name: 'US Dollars'}),
      amount: new FormControl(1),
      result: new FormControl({value: null, disabled: true})
    });
    this.selectedCurrencyListener();
    this.conversionFieldsListener();
  }

  private selectedCurrencyListener(): void {
    this.subscriptions.add(this.convertCurrencyForm.get('from').valueChanges.subscribe(() => {
      this.getCurrentRates();
    }));
  }

  private conversionFieldsListener(): void {
    this.subscriptions.add(this.convertCurrencyForm.get('amount').valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.calculateConversion();
    }));
    this.subscriptions.add(this.convertCurrencyForm.get('to').valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.calculateConversion();
    }));
  }

  private getCurrencies(): void {
    this.currencyService.getCurrencies().subscribe(currencies => {
      if (currencies) {
        this.currencies = currencies;
      }
    });
  }

  private getCurrentRates(): void {
    const code = this.convertCurrencyForm.get('from').value.code;
    this.currencyService.getLatestRates(code).subscribe(rates => {
      if (rates) {
        this.rates = rates;
        this.calculateConversion();
      }
    });
  }

  changeFormControlCurrency(key: string, $event: CurrencyModel): void {
    this.convertCurrencyForm.get(key).setValue($event);
  }

  switchCurrencies(): void {
    const fromCurrency = this.convertCurrencyForm.get('from').value;
    const toCurrency = this.convertCurrencyForm.get('to').value;
    this.convertCurrencyForm.get('from').setValue(toCurrency);
    this.convertCurrencyForm.get('to').setValue(fromCurrency);
    this.calculateConversion();
  }

  private calculateConversion(): void {
    const baseCurrency = this.convertCurrencyForm.get('from').value.code;
    const convertCurrency = this.convertCurrencyForm.get('to').value.code;
    const amount = this.convertCurrencyForm.get('amount').value;
    if (baseCurrency === convertCurrency) {
      this.convertCurrencyForm.get('result').setValue(1);
      return;
    }
    this.currencyService.getExchangeRate(baseCurrency, convertCurrency).subscribe(rate => {
      if (!rate) {
        this.snackBar.open('Conversion failed');
        return;
      }
      this.convertCurrencyForm.get('result').setValue((rate * amount).toFixed(4));
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
