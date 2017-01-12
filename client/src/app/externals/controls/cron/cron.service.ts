import { ISelectOption } from '../../../views/controls/components/select/select.component';
import { Injectable } from '@angular/core';

export interface ICronOptions {
  yearValue: string;
  yearEnumValue: string[];
  monthValue: string;
  monthEnumValue: string[];
  weekValue: string;
  weekEnumValue: string[];
  dayValue: string;
  dayEnumValue: string[];
  hourEnumValue: string[];
  minEnumValue: string[];
}

export interface IOption{
  text: string;
  value: string;
}

@Injectable()
export class CronService {
  static instance = new CronService;

  
  _yearEnum: IOption[];
  _monthEnum: IOption[];
  _weekEnum: IOption[];
  _dayEnum: IOption[];
  _hourEnum: IOption[];
  _minEnum: IOption[];


  yearOptions = [{
    text: 'nodeset.JNTimeNode.everyYear',
    value: '*'
  }, {
    text: 'nodeset.JNTimeNode.selectedYears',
    value: 'enum'
  }];

  monthOptions = [{
    text: 'nodeset.JNTimeNode.everyMonth',
    value: '*'
  }, {
    text: 'nodeset.JNTimeNode.selectedMonths',
    value: 'enum'
  }];

  weekOptions = [{
    text: 'nodeset.JNTimeNode.noneWeek',
    value: '?'
  }, {
    text: 'nodeset.JNTimeNode.everyWeek',
    value: '*'
  }, {
    text: 'nodeset.JNTimeNode.selectedWeeks',
    value: 'enum'
  }];

  dayOptions = [{
    text: 'nodeset.JNTimeNode.everyday',
    value: '*'
  }, {
    text: 'nodeset.JNTimeNode.selectedDays',
    value: 'enum'
  }];

  hourOptions = [{
    text: 'every',
    value: '*'
  }, {
    text: 'enum',
    value: 'enum'
    }];

  minOptions = [{
    text: 'every',
    value: '*'
  }, {
    text: 'enum',
    value: 'enum'
  }];

  get yearEnums(): ISelectOption[] {
    if (this._yearEnum) {
      return this._yearEnum;
    }
    let currentYear = (new Date()).getFullYear();
    let items = new Array<ISelectOption>(5);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (currentYear + i).toString(),
        value: (currentYear + i).toString()
      };
      items[i] = item;
    }
    this._yearEnum = items;
    return this._yearEnum;
  }

  get monthEnums(): ISelectOption[] {
    if (this._monthEnum) return this._monthEnum;
    let monthAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let items = monthAbbrs.map((month, index) => {
      return {
        text: month,
        value: (index + 1).toString()
      };
    });

    this._monthEnum = items;
    return this._monthEnum;
  }

  get weekEnum(): ISelectOption[]{
    if (this._weekEnum) {
      return this._weekEnum;
    }
    let items = new Array<ISelectOption>(6);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (i + 1).toString(),
        value: (i + 1).toString()
      };
      items[i] = item;
    }

    items[5] = {
      text: 'Last',
      value: 'L'
    };
    this._weekEnum = items;
    return items;
  }

  getDayEnum(weekSelected): ISelectOption[] {
    let items: Array<ISelectOption>;
    if (!weekSelected) {
      items = new Array<ISelectOption>(32);
      for (let i = 0; i < items.length; i++){
        let item = {
          text: (i + 1).toString(),
          value: (i + 1).toString()
        };
        items[i] = item;
      }

      items[items.length - 1] = {
        text: 'Last',
        value: 'L'
      };

    } else {
      let dateOfWeekEnum = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
      items = new Array<ISelectOption>(7);
      for (let i = 0; i < items.length; i++){
        let item = {
          text: dateOfWeekEnum[i],
          value: (i + 1).toString()
        };
        items[i] = item;
      }
    }

    return items;
  }

  get hourEnum(): ISelectOption[]{
    if (this._hourEnum) return this._hourEnum;
    let items = new Array<ISelectOption>(24);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (i).toString(),
        value: i.toString()
      };
      items[i] = item;
    }
    this._hourEnum = items;
    return items;
  }

  get minEnum(): ISelectOption[]{
    if (this._minEnum) return this._minEnum;
    let items = new Array<ISelectOption>(60);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (i).toString(),
        value: i.toString()
      };
      items[i] = item;
    }
    this._minEnum = items;
    return items;
  }

  generateCron(opt: ICronOptions) {
    let second = '0',
      minute = '0',
      hour = '0',
      day = '*',
      month = '*',
      dateOfWeek = '?',
      year = '*';

    minute = opt.minEnumValue.join(',') || '*';
    hour = (opt.hourEnumValue.join(',')) || '*';
    day = (opt.weekValue === '?' ? opt.dayEnumValue.join(',') : '?' ) || '*';
    month = opt.monthEnumValue.join(',') || '*';

    if (opt.weekValue === '?') {
      dateOfWeek = '?';
    } else if (opt.weekValue !== '*' && opt.weekEnumValue.length) {
      dateOfWeek = opt.weekEnumValue.map(w => {
        return opt.dayEnumValue.map((d) => {
          return (w === 'L') ? `${d}L` : `${w}#${d}`;
        }).join(',');
      }).join(',');
    } else {
      dateOfWeek = opt.dayEnumValue.join(',');
    }

    year = opt.yearEnumValue.join(',') || '*';

    return [second, minute, hour, day, month, dateOfWeek, year].join(' ');
  }
}
