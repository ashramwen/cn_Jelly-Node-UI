import { forwardRef, Component, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { JNEditorFormControl } from '../../control.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JNControl } from '../../control.annotation';
import { IJNFormControlInput } from '../../../interfaces/form-control-input.interface';
import { JsonEditorComponent, JsonEditorOptions } from 'ng2-jsoneditor';

const VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JNJSONEditorControl),
    multi: true
};

export interface IJSONEditorInput extends IJNFormControlInput {
  schema?: any;
}

@JNControl({
  template: `
    <jn-editor-json-editor 
      [label]="inputs.label" 
      [disabled]="inputs.disabled" 
      [schema]="inputs.schema"
      [formControl]="formControl">
    </jn-editor-json-editor>
  `
})
@Component({
  selector: 'jn-editor-json-editor',
  styles: [
    require('./json-editor.component.scss')
  ],
  template: `
    <div class="jn-form">
      <label class="jn-form-label">{{label | translate}}</label>
      <json-editor [options]="editorOptions" [data]="value" height="300px"></json-editor >
    </div>
  `,
  providers: [VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class JNJSONEditorControl extends JNEditorFormControl {
  @Input()
  protected disabled: boolean;
  @Input()
  protected hidden: boolean;
  @Input()
  protected label: String;
  @Input()
  protected schema: any;
  @Input()
  protected editorOptions: JsonEditorOptions;

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  protected init() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.search = false;
    this.editorOptions.modes = ['code', 'text', 'tree'];
    this.editorOptions.onChange = () => {
      try {
        this.value = this.editor.get();
      } catch (e) {
        this.value = this.editor.getText();
      }
    };
  }

}
