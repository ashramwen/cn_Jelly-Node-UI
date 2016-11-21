import {
  Component, Input, Output,
  ElementRef, Renderer, NgZone, SimpleChange
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';
import { IControlOptions } from './control.annotation';
import { JNFormControl } from '../../controls/interfaces/control.component';

export abstract class JNEditorFormControl extends JNFormControl implements ControlValueAccessor {
  static template: string;
  protected abstract disabled: boolean;
  protected abstract hidden: boolean;
  protected abstract label: String;
}
