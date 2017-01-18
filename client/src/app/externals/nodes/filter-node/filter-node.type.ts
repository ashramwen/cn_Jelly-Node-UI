import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNFilterNodeModel, IFilter } from './filter-node-model.type';
import { JNFilterNodeEditorModel } from './filter-node-editor-model.type';
import { JNFilterNodePaletteModel } from './filter-node-palette-mode.type';
import { JNFilterNodeInfoPanelModel } from './filter-node-info-panel-model.type';

@JNNode({
  title: 'nodeset.JNFilterNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNFilterNodeEditorModel,
  infoPanelModel: JNFilterNodeInfoPanelModel,
  paletteModel: JNFilterNodePaletteModel,
  accepts: [],
  modelRules: [{
    message: 'nodeset.JNFilterNode.errors.scheduleTypeRequired',
    validator: (model: JNFilterNodeModel) => {
      return !!model.timeType;
    }
  }, {
    message: 'nodeset.JNFilterNode.errors.cronError',
    validator: (model: JNFilterNodeModel) => {
      if (!model.timeType) return true;
      if (model.timeType === 'interval') {
        return !!model.interval && !!model.timeUnit;
      } else {
        return !!model.cron && model.cron.length === 11;
      }
    }
  }]
})
export class JNFilterNode extends JNBaseNode  {
  protected model: JNFilterNodeModel = new JNFilterNodeModel;

  public readonly body: IFilter;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
