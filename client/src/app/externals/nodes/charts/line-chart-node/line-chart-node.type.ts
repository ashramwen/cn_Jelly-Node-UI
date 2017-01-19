import { ChartNode } from '../models/chart-node.type';

export class LineChartNode extends ChartNode {
  static hasInput() {
    return true;
  }
  static hasOutput() {
    return true;
  }
}