import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface ITime extends INodeBody {
  timeType: 'interval' | 'cron';
  cron: string;
  interval: number;
  timeUnit: string;
}

@Serializable()
export class JNTimeNodeModel extends JNNodeModel<ITime> implements ITime {
  static deserialize: (data: any) => JNTimeNodeModel;

  timeType: 'interval' | 'cron';
  cron: string;
  interval: number;
  timeUnit: string;

  constructor() {
    super();
    this.timeType = null;
    this.cron = null;
    this.interval = null;
    this.timeUnit = null;
  }
}
