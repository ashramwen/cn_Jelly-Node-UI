import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNTimeNodeModel extends JNNodeModel {

  timeType: 'interval' | 'schedule';
  cron: String;
  interval: number;
}
