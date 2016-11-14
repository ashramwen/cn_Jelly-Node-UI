/**
 * @author george george.lin@kii.com
 */
import { IJNFormButton } from './button';
import { IJNFormControl } from './form-control.interface';
import { IJNEditorFormParser } from './parser.interface';
import { IJNEditorFormFormatter } from './formatter.interface';
import { FormGroup, FormControl } from '@angular/forms';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { JNUtils } from '../../../share/util';
import { Subscriber, Subscription } from 'rxjs';

export abstract class JNEditorModel {

  static title: string;
  static buttons: IJNFormButton[];
  static viewTemplate: string;
  static formControls: { [fieldName: string]: IJNFormControl };

  title: string;
  get formGroup() {
    return this._formGroup;
  }

  protected model: JNNodeModel<any>;

  private _formControls: { [fieldName: string]: IJNFormControl };
  private _formGroup: FormGroup;
  private _subscriberPool: {
    control: IJNFormControl,
    subscriber: Subscription
  }[];

  constructor() {
    this._init();
  }

  /**
   * @desc get formcontrol input
   * @param  {string} property
   */
  protected getInput(property: string) {
    return this._formControls[property].input;
  }

  /**
   * @desc to get editor result
   * @param  JNNodeModel
   */
  public submit() {
    return this.formate();
  }

  /**
   * @desc data entrance
   * @param  {JNNodeModel} data
   */
  public load(data: JNNodeModel<any>) {
    this.model = data.clone();
    this.parse(data);
  }

  /**
   * @desc convert formControls object to an array
   * @returns IJNFormControl[]
   */
  public controlsToArray(): IJNFormControl[] {
    let arr = [];
    this.literal((fn, fc) => {
      arr.push(fc);
    });
    return arr;
  }

  /**
   * @desc to literal all formControls
   * @param  {(fieldName:string,fc:IJNFormControl)=>any} cb
   */
  public literal(cb: (fieldName: string, fc: IJNFormControl) => any) {
    Object.keys(this._formControls).forEach((fieldName: string) => {
      cb(fieldName, this._formControls[fieldName]);
    });
  }

  protected buildControls(controls: { [fieldName: string]: IJNFormControl }) {
    this._buildControls(controls);
  }

  /**
   * @desc called when model is created
   */
  protected abstract init(): void;

  /**
   * @desc called when data model is updated
   * @param  {string} fieldName
   * @param  {any} value
   * @returns void
   */
  protected abstract updated(fieldName: string, value: any): void;

  /**
   * @desc to handle inputs
   * @param  {JNNodeModel} data
   * @returns void
   */
  protected abstract parse(data: JNNodeModel<any>): void;

  /**
   * @desc to produce output
   * @returns JNNodeModel
   */
  protected abstract formate(): JNNodeModel<any>;

  /**
   * @desc to update formControl value
   * @param  {string} fieldName
   * @param  {any} value
   */
  protected setValue(fieldName: string, value: any): void {
    this._formControls[fieldName].formControl.setValue(value);
  }

  /**
   * @desc to get formControl value
   * @param  {string} fieldName
   */
  protected getValue(fieldName: string) {
    return this._formControls[fieldName].formControl.value;
  }

  /**
   * @desc called when instance is being created
   */
  private _init() {
    this._formGroup = new FormGroup({});
    let constructor = <typeof JNEditorModel>this.constructor;
    this.title = constructor.title;
    this._subscriberPool = [];
    if (!constructor.formControls) {
      this._formControls = {};
    } else {
      this._buildControls(constructor.formControls);
    }
    this.init();
  }

  /**
   * @desc build a group of controls to replace old controls
   * @param  {{[fieldName:string]:IJNFormControl}} controls
   */
  private _buildControls(controls: { [fieldName: string]: IJNFormControl }) {
    this._clearControls();
    this._formControls = controls;
    JNUtils.toArray<IJNFormControl>(controls)
      .forEach((r) => {
        let fieldName = r.key;
        let controlSchema = r.value;
        this._buildControl(controlSchema, fieldName);
      });
  }

  /**
   * @desc build one control
   * @param  {IJNFormControl} control
   * @param  {string} fieldName
   */
  private _buildControl(control: IJNFormControl, fieldName: string) {
    this._formControls[fieldName] = control;
    control.formControl = new FormControl();
    let _self = this;
    let subscriber = control.formControl.valueChanges
      .subscribe((value) => {
        setTimeout(() => {
          _self.updated(fieldName, value);
        });
      });
    this._subscriberPool.push({
      control: control,
      subscriber: subscriber
    });
    this._formGroup.addControl(fieldName, control.formControl);
    if (!JNUtils.isBlank(control.model)) {
      control.formControl.setValue(control.model);
    }
  }

  /**
   * @desc clear all controls
   */
  private _clearControls() {
    JNUtils.toArray<IJNFormControl>(this._formControls)
      .forEach((r) => {
        let control = r.value;
        let fieldName = r.key;
        this._removeControl(control, fieldName);
      });
  }

  /**
   * @desc remove one control;
   * @param  {IJNFormControl} control
   */
  private _removeControl(control: IJNFormControl, fieldName: string) {
    let item = this._subscriberPool.find((v) => {
      return v.control === control;
    });
    if (!!item) {
      item.subscriber.unsubscribe();
      JNUtils.removeItem(this._subscriberPool, item);
    }
    this._formGroup.removeControl(fieldName);
    delete this._formControls[fieldName];
  }

}
