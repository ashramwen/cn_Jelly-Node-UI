import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNRuleNode } from '../rule-node/rule-node.type';
import { JNApiNodeEditorModel } from './api-node-editor-model.type';
import { JNApiNodeModel, IApi } from './api-node-model.type';
import { JNApiPaletteNodeModel } from './api-node-palette-model.type';
import { JNApiNodeInfoPanelModel } from './api-node-info-panel-model.type';

@JNNode({
  title: 'nodeset.JNApiNode.nodename',
  icon: '\ue906',
  color: '',
  borderColor: '',
  editorModel: JNApiNodeEditorModel,
  infoPanelModel: JNApiNodeInfoPanelModel,
  paletteModel: JNApiPaletteNodeModel,
  accepts: ['Rule'],
  modelRules: [{
    message: 'nodeset.JNApiNode.errors.emptyApiName',
    validator: (model: JNApiNodeModel) => {
      return !!model.apiName;
    }
  }, {
    message: 'nodeset.JNApiNode.errors.emptyUrl',
    validator: (model: JNApiNodeModel) => {
      return !!model.apiUrl;
    }
  }, {
    message: 'nodeset.JNApiNode.errors.emptyRequestMethod',
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
