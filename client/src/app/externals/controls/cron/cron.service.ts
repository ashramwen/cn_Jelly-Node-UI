import { ISelectOption } from '../../../views/controls/components/select/select.component';

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

export class CronService {
  static instance = new CronService;

  yearOptions = [{
    text: '每一年',
    value: '*'
  }, {
    text: '指定年',
    value: 'enum'
  }];

  monthOptions = [{
    text: '每个月',
    value: '*'
  }, {
    text: '指定月',
    value: 'enum'
  }];

  weekOptions = [{
    text: '不指定周',
    value: '?'
  }, {
    text: '每一周',
    value: '*'
  }, {
    text: '指定周',
    value: 'enum'
  }];

  dayOptions = [{
    text: '每一天',
    value: '*'
  }, {
    text: '指定天',
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
    let currentYear = (new Date()).getFullYear();
    let items = new Array<ISelectOption>(5);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (currentYear + i).toString(),
        value: (currentYear + i).toString()
      };
      items[i] = item;
    }
    return items;
  }

  get monthEnums(): ISelectOption[] {
    let monthAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let items = monthAbbrs.map((month, index) => {
      return {
        text: month,
        value: (index + 1).toString()
      };
    });

    return items;
  }

  get weekEnum(): ISelectOption[]{
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
    let items = new Array<ISelectOption>(24);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (i).toString(),
        value: i.toString()
      };
      items[i] = item;
    }

    return items;
  }

  get minEnum(): ISelectOption[]{
    let items = new Array<ISelectOption>(60);
    for (let i = 0; i < items.length; i++) {
      let item = {
        text: (i).toString(),
        value: i.toString()
      };
      items[i] = item;
    }

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
