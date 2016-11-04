import {
  Component, Input, Output,
  ElementRef, Renderer, NgZone, SimpleChange
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { IControlOptions } from './control.annotation';

export abstract class JNFormControl implements ControlValueAccessor {
  static template: string;
  @Input()
  protected abstract disabled: boolean;
  @Input()
  protected abstract hidden: boolean;
  @Input()
  protected abstract label: String;
  @Input()
  protected abstract data: any;

  protected _value = null;
  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  constructor(
    private el: ElementRef,
    public renderer: Renderer,
    private _zone: NgZone) {
  }

  // get accessor
  get value(): any {
    return this._value;
  };

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      if (this.onChange) {
        this.onChange(v);
      }
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.value) {
      this.value = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
