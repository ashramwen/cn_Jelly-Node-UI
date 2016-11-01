import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNConjunctionNodeModel extends JNNodeModel {
  conjunction: 'and' | 'or' | 'nore';
}
