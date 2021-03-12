import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyModel } from '../models/currency.model';

@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnChanges {
  displayedColumns: string[] = ['value', 'currency'];
  dataSource: MatTableDataSource<CurrencyModel>;
  @Input() rates: CurrencyModel[];
  constructor() { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.rates);
  }

}
