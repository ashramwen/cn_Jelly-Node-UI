import { IJNPaletteModel } from '../../../views/palette/interfaces';
import { IJNPaletteConnection } from '../../../views/palette/interfaces/palette-connection.interface';
import { JNRuleNode } from '../rule-node/rule-node.type';
import { JNLocationNode } from './location-node.type';
import { IJNPaletteNode } from '../../../views/palette/palette-node.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNConjunctionNode } from '../conjunction-node/conjunction-node.type';
import { JNConditionNode } from '../condition-node/condition-node.type';

export class JNLocationPaletteModel implements IJNPaletteModel {

  staticPropertyTitle: String = 'nodes';
  dynamicPropertyTitle: String = 'connections';
  nodes: Array<IJNPaletteNode>;
  connections: Array<IJNPaletteConnection>;

  static instance = new JNLocationPaletteModel();

  protected init() {
    this.nodes = [];
    this.connections = [];

    let ruleNode = new IJNPaletteNode(JNRuleNode);
    let locationNode = new IJNPaletteNode(JNLocationNode);
    let DeviceTypeNode = new IJNPaletteNode(JNDeviceTypeNode);
    let PropertyNode = new IJNPaletteNode(JNDevicePropertyNode);
    let conjunctionNode = new IJNPaletteNode(JNConjunctionNode);
    let conditionNode = new IJNPaletteNode(JNConditionNode);
    
    
    

  }
}
