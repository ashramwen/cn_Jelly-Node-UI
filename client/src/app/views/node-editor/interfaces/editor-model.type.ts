/**
 * @author george george.lin@kii.com
 */
import { IJNFormButton } from './button';
import { IJNFormControl } from './form-control.interface';
import { IJNEditorFormParser } from './parser.interface';
import { IJNEditorFormFormatter } from './formatter.interface';
import { FormGroup } from '@angular/forms';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export abstract class JNEditorModel {

  title: String;
  buttons: IJNFormButton[];
  viewTemplate?: String;
  formControls?: { [fieldName: string]: IJNFormControl };
  parser?: IJNEditorFormParser;
  formatter?: IJNEditorFormFormatter;
  formGroup: FormGroup;
  model: JNNodeModel;

  constructor() {
    this._init();
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
  public load(data: JNNodeModel) {
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
    Object.keys(this.formControls).forEach((fieldName: string) => {
      cb(fieldName, this.formControls[fieldName]);
    });
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
  protected abstract parse(data: JNNodeModel): void;

  /**
   * @desc to produce output
   * @returns JNNodeModel
   */
  protected abstract formate(): JNNodeModel;

  /**
   * @desc to update formControl value
   * @param  {string} fieldName
   * @param  {any} value
   */
  protected setValue(fieldName: string, value: any): void {
    this.formControls[fieldName].formControl.setValue(value);
  }

  /**
   * @desc to get formControl value
   * @param  {string} fieldName
   */
  protected getValue(fieldName: string) {
    return this.formControls[fieldName].formControl.value;
  }

  /**
   * @desc called when instance is being created
   */
  private _init() {
    this.init();
    this.formGroup = new FormGroup({});
    this.literal((fieldName, controlSchema) => {
      // register form controls into form group
      this.formGroup.addControl(fieldName, controlSchema.formControl);

      // add listeners
      controlSchema.formControl.valueChanges
        .subscribe((value) => {
          setTimeout(() => {
            this.updated(fieldName, value);
          });
        });
    });
  }

}
