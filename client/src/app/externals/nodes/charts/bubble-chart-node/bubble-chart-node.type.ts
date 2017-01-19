import { ChartNode } from '../models/chart-node.type';
import { JNNodeExtend } from '../../../../core/models/node-extend-annotation';

@JNNodeExtend()
export class BubbleChartNode extends ChartNode {
  static title: string = 'Bubble Chart';
  static icon: string = '\uf261';
}