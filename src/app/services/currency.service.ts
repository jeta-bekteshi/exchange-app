import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyModel } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly baseUrl = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {
  }

  getCurrencies(): Observable<CurrencyModel[]> {
    return this.http.get(`${this.baseUrl}/currencies`).pipe(map(this.getFormattedCurrencies));
  }

  getLatestRates(code: string): Observable<CurrencyModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('from', code);
    return this.http.get(`${this.baseUrl}/latest`, {params}).pipe(map(this.getFormattedRates));
  }

  getExchangeRate(from: string, to: string): Observable<number> {
    let params: HttpParams = new HttpParams();
    params = params.set('from', from);
    params = params.set('to', to);
    return this.http.get(`${this.baseUrl}/latest`, {params}).pipe(map(this.getFormattedRates), map(currency => {
      if (currency.length > 0) {
        return currency[0].value;
      }
    }));
  }

  getHistoricalRates(code: string, date: string): Observable<CurrencyModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('from', code);
    return this.http.get(`${this.baseUrl}/${date}`, {params}).pipe(map(this.getFormattedRates));
  }

  private getFormattedCurrencies(data): CurrencyModel[] {
    const currencies = [];
    if (data) {
      Object.keys(data).forEach(code => currencies.push({code, name: data[code]}));
    }
    return currencies;
  }

  private getFormattedRates(data): CurrencyModel[] {
    const currencies = [];
    if (data) {
      const rates = data.rates;
      Object.keys(rates).forEach(code => currencies.push({code, value: rates[code]}));
    }
    return currencies;
  }

}
