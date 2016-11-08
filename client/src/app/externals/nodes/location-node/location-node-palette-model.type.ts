import { IJNPaletteModel } from '../../../views/palette/interfaces';
import { IJNPaletteConnection } from '../../../views/palette/interfaces/palette-connection.interface';
import { JNRuleNode } from '../rule-node/rule-node.type';
import { JNLocationNode } from './location-node.type';
import { IJNPaletteNode } from '../../../views/palette/palette-node.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';

export class JNLocationPaletteModel implements IJNPaletteModel {

  staticPropertyTitle: String = 'nodes';
  dynamicPropertyTitle: String = 'connections';
  nodes: Array<IJNPaletteNode>;
  connections: Array<IJNPaletteConnection>;

  static instance = new JNLocationPaletteModel();

  protected init() {
    this.nodes = [];
    this.connections = [];

    let ruleNode = new IJNPaletteNode();
    let locationNode = new IJNPaletteNode();
    let TimeNode = new IJNPaletteNode();
    let DeviceTypeNode = new IJNPaletteNode();
    let PropertyNode = new IJNPaletteNode();
    let conjunctionNode = new IJNPaletteNode();
    let conditionNode = new IJNPaletteNode();
    let actionNode = new IJNPaletteNode();
    let apiNode = new IJNPaletteNode();
    
    
    

  }
}
