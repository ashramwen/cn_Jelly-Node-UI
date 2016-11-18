import { forwardRef, Component, Input, Output, ViewEncapsulation, EventEmitter, SimpleChange } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNEditorControl } from '../../../views/node-editor/components/control.annotation';
import { JNEditorFormControl } from '../../../views/node-editor/components/control.component';
import { IJNEditorFormControlInput } from '../../../views/node-editor/interfaces/form-control-input.interface';
import { CronService } from './cron.service';
import { JNSelect, ISelectOption } from '../../../views/controls/components/select/select.component';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RuleCron),
    multi: true
};

@JNEditorControl({
  template: `
    <rule-editor-cron 
      [label]="inputs.label" 
      [disabled]="inputs.disabled"
      [formControl]="formControl">
    </rule-editor-cron>
  `
})
@Component({
  selector: 'rule-editor-cron',
  styles: [
    require('./cron.component.scss')
  ],
  template: require('./cron.component.html'),
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class RuleCron extends JNEditorFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected data: any;

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

  private cronService: CronService;

  private yearOptions: ISelectOption[];
  private monthOptions: ISelectOption[];
  private weekOptions: ISelectOption[];
  private dayOptions: ISelectOption[];
  private hourOptions: ISelectOption[];
  private minOptions: ISelectOption[];

  protected init() {
    this.cronService = CronService.instance;
    this.yearOptions = this.cronService.yearOptions;
    this.monthOptions = this.cronService.monthOptions;
    this.weekOptions = this.cronService.weekOptions;
    this.dayOptions = this.cronService.dayOptions;
    this.hourOptions = this.cronService.hourOptions;
    this.minOptions = this.cronService.minOptions;

    this.yearValue = this.yearValue || this.yearOptions[0].value;
    this.monthValue = this.monthValue || this.monthOptions[0].value;
    this.weekValue = this.weekValue || this.weekOptions[0].value;
    this.dayValue = this.dayValue || this.dayOptions[0].value;

    this.yearEnumValue = this.yearEnumValue || [];
    this.monthEnumValue = this.monthEnumValue || [];
    this.weekEnumValue = this.weekEnumValue || [];
    this.dayEnumValue = this.dayEnumValue || [];
    this.hourEnumValue = this.hourEnumValue || [];
    this.minEnumValue = this.minEnumValue || [];
  }

  private change() {
    setTimeout(() => {
      console.log(this.cronService.generateCron(this));
    });
  }

  private weekChange($event: SimpleChange) {
    if ($event.currentValue === $event.previousValue) return;
    if ($event.currentValue === '?' || $event.previousValue === '?') {
      this.dayEnumValue = [];
    }
  }
}
