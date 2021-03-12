import * as moment from 'moment';
import { DateOptionModel } from './date-option.model';

export const DATES: DateOptionModel[] = [
  {text: 'Today', date: moment().format('YYYY-MM-DD')},
  {text: 'Yesterday', date: moment().subtract(1, 'day').format('YYYY-MM-DD')},
  {text: 'Last Week', date: moment().subtract(7, 'day').format('YYYY-MM-DD')},
  {text: 'Last Month', date: moment().subtract(1, 'month').format('YYYY-MM-DD')},
  {text: 'Last Year', date: moment().subtract(1, 'year').format('YYYY-MM-DD')},
  {text: '5 Years Ago', date: moment().subtract(5, 'year').format('YYYY-MM-DD')}
];
