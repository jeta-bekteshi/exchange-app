import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyModel } from '../../models/currency.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-currency-options',
  templateUrl: './currency-options.component.html',
  styleUrls: ['./currency-options.component.scss']
})
export class CurrencyOptionsComponent implements OnInit {
  @Input() currencies: CurrencyModel[];
  @Input() label: string;
  @Input() selectedCurrency: CurrencyModel;
  @Output() selectedCurrencyEmitter: EventEmitter<CurrencyModel> = new EventEmitter<CurrencyModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  compareCurrencyObjects(o1: CurrencyModel, o2: CurrencyModel): boolean {
    return o1?.code === o2?.code;
  }

  changeSelectedCurrency($event: MatSelectChange): void {
    this.selectedCurrencyEmitter.emit($event.value);
  }
}
