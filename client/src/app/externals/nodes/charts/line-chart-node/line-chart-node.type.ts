import { ChartNode } from '../models/chart-node.type';
import { JNNodeExtend } from '../../../../core/models/node-extend-annotation';

@JNNodeExtend()
export class LineChartNode extends ChartNode {
  static title: string = 'Line';
  static icon: string = '\uf201';
}