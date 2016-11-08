import { IJNPaletteConnection } from './palette-connection.interface';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { IJNPaletteNode } from '../palette-node.type';

export interface IJNPaletteModel {
  staticPropertyTitle: String;
  dynamicPropertyTitle: String;
  nodes: Array<IJNPaletteNode>;
  connections: Array<IJNPaletteConnection>;
  
}
