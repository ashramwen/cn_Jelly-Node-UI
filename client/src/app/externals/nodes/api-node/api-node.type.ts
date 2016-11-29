import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNRuleNode } from '../rule-node/rule-node.type';
import { JNApiNodeEditorModel } from './api-node-editor-model.type';
import { JNApiNodeModel, IApi } from './api-node-model.type';
import { JNApiPaletteModel } from './api-node-palette-model.type';

@JNNode({
  title: 'nodeset.JNApiNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNApiNodeEditorModel,
  infoPanelModel: null,
  paletteModel: JNApiPaletteModel,
  accepts: ['Rule'],
  modelRules: [{
    message: 'API名称不能为空',
    validator: (model: JNApiNodeModel) => {
      return !!model.apiName;
    }
  }, {
    message: 'API URL不能为空',
    validator: (model: JNApiNodeModel) => {
      return !!model.apiUrl;
    }
  }, {
    message: 'API 请求方式不能为空',
    validator: (model: JNApiNodeModel) => {
      return !!model.method;
    }
  }]
})
export class JNApiNode extends JNBaseNode  {

  public readonly body: IApi;

  public get name(): string{
    return this.body.apiName || this.getTitle();
  }

  protected model: JNApiNodeModel = new JNApiNodeModel;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener(data: Object) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
