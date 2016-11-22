import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNTimeNodeModel, ITime } from './time-node-model.type';
import { JNTimeNodeEditorModel } from './time-node-editor-model.type';
import { JNTimePaletteModel } from './time-node-palette-mode.type';

@JNNode({
  title: 'nodeset.JNTimeNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNTimeNodeEditorModel,
  infoPanelModel: null,
  paletteModel: JNTimePaletteModel,
  accepts: [],
  modelRules: [{
    message: '必须选择一种间隔类型',
    validator: (model: JNTimeNodeModel) => {
      return !!model.timeType;
    }
  }, {
    message: '间隔格式不正确',
    validator: (model: JNTimeNodeModel) => {
      if (!model.timeType) return true;
      if (model.timeType === 'interval') {
        return !!model.interval && !!model.timeUnit;
      } else {
        return !!model.cron && model.cron.length === 11;
      }
    }
  }]
})
export class JNTimeNode extends JNBaseNode  {
  protected model: JNTimeNodeModel = new JNTimeNodeModel;

  public readonly body: ITime;

  protected whenReject() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
