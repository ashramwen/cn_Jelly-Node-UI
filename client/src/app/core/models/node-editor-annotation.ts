import { JNBaseNode } from './jn-base-node.type';
import { IJNFormControl } from '../../views/node-editor/interfaces/form-control.interface';
import { JNEditorModel } from '../../views/node-editor/interfaces/editor-model.type';


export interface INodeEditorOptions {
  title: string;
  formControls?: { [key: string]: IJNFormControl };
}

export function JNNodeEditor(options: INodeEditorOptions) {
  return function (nodeClass: typeof JNEditorModel) {
    nodeClass.title = options.title;
    nodeClass.formControls = options.formControls;
  };
}
