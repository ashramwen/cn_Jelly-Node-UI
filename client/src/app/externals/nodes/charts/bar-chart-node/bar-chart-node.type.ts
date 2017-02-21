import { ChartNode } from '../models/chart-node.type';
import { JNNodeExtend } from '../../../../core/models/node-extend-annotation';

@JNNodeExtend()
export class BarChartNode extends ChartNode {
  static title: string = 'Bar';
  static icon: string = '\uf080';
}