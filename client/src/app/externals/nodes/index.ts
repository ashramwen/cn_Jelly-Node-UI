import { JNFilterNodeInfoPanelModel } from './filter-node/filter-node-info-panel-model.type';
import { BucketNodeInfoPanelModel } from './bucket-node/bucket-node-info-panel-model.type';
import { ChartNodeInfoPanelModel } from './charts/models/chart-node-info-panel-model.type';
import { MetricNodeInfoPanelModel } from './metric-node/metric-node-info-panel-model.type';
import { ExtendNodeInfoPanelModel } from './extend-node/extend-node-info-panel-model.type';
import { DrilldownNodeInfoPanelModel } from './drilldown-node/drilldown-node-info-panel-model.type';
import { SubChartNodeInfoPanelModel } from './sub-chart-node/sub-chart-node-info-panel-model.type';
import { ChartContainerNodeInfoPanelModel } from './chart-container-node/chart-container-node-info-panel.type';
import { AnyNodeInfoPanelModel } from './any-node/any-node-info-panel-model.type';
import { AnalysisTargetNodeInfoPanelModel } from './analysis-target-node/analysis-target-node-info-panel-model.type';
import { XAxisNodeInfoPanelModel } from './x-axis-node/x-axis-node-info-panel-model.type';
import { YAxisNodeInfoPanelModel } from './y-axis-node/y-axis-node-info-panel-model.type';
import { DataSourceNodeInfoPanelModel } from './data-source/data-source-node-info-panel-model.type';

export const EXTERNAL_INFO_PANEL_COMPONENTS = [
    JNFilterNodeInfoPanelModel,
    ChartNodeInfoPanelModel,
    BucketNodeInfoPanelModel,
    MetricNodeInfoPanelModel,
    ExtendNodeInfoPanelModel,
    DrilldownNodeInfoPanelModel,
    SubChartNodeInfoPanelModel,
    ChartContainerNodeInfoPanelModel,
    AnyNodeInfoPanelModel,
    AnalysisTargetNodeInfoPanelModel,
    XAxisNodeInfoPanelModel,
    YAxisNodeInfoPanelModel,
    DataSourceNodeInfoPanelModel
];