import { IJNFormButton } from './button';
import { IJNFormControl } from './form-control.interface';
import { IJNEditorFormParser } from './parser.interface';
import { IJNEditorFormFormatter } from './formatter.interface';

export interface IJNEditorModel {
  title: String;
  buttons: IJNFormButton[];
  viewTemplate?: String;
  formControls?: { [fieldName: string]: IJNFormControl };
  parser?: IJNEditorFormParser;
  formatter?: IJNEditorFormFormatter;
}
