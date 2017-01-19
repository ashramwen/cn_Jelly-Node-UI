import { ChartNode } from '../models/chart-node.type';
import { JNNodeExtend } from '../../../../core/models/node-extend-annotation';

@JNNodeExtend()
export class ScatterChartNode extends ChartNode {
  static title: string = 'Scatter Chart';
  static icon: string = '\uf00a';
}