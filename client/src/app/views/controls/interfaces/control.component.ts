import {
  Component, Input, Output,
  ElementRef, Renderer, NgZone, SimpleChange
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';

export abstract class JNFormControl implements ControlValueAccessor {
  protected abstract disabled: boolean;

  protected _value = null;
  protected onChange = (_: any) => {};
  protected onTouched = () => {};

  constructor(
    protected el: ElementRef,
    public renderer: Renderer,
    protected _zone: NgZone,
    protected _provider?: any
  ) {
    this.init();
  }

  protected init() { }

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
