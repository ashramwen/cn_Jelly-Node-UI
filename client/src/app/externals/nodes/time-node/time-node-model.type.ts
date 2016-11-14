import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNTimeNodeModel extends JNNodeModel {

  timeType: 'interval' | 'schedule';
  cron: string;
  interval: number;
  unit: string;

  constructor() {
    super();
    this.timeType = null;
    this.cron = null;
    this.interval = null;
    this.unit = null;
  }
}
