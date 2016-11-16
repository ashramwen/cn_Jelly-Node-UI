import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { RuleApplication } from '../../rule-application-core';
import { JNDevicePropertyNode } from './device-property-node.type';
import { JNPaletteNode } from '../../../views/palette/palette-node.type';
import { JNDeviceTypeInfoPanelModel } from '../device-type-node/device-type-node-info-panel-model.type';
import { JNDeviceTypePaletteModel } from '../device-type-node/device-type-node-palette-model.type';

export class JNDevicePropertyPaletteModel extends JNPaletteModel {
  nodes = [];
  connections = [];

  constructor() {
    super();
    this.init();
  }

  public init() {
    this.nodes = JNPaletteModel.getNodes(JNDevicePropertyNode);
    this.connections.push(JNDeviceTypePaletteModel.createConnection(JNDevicePropertyNode));
  }

  static createProperty(deviceType: string, value: string): Object {
    let property = {
      "typeName": deviceType,
      "property": value
    }
    return property;
  }

  static createConnection(selectedNodeType: typeof JNBaseNode, deviceType: string): JNPaletteConnection {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas[deviceType].content.statesSchema.properties);
    let connection = new JNPaletteConnection();

    connection.title = deviceType;
    connection.properties = [];
    deviceTypes.forEach(function (deviceProperty) {
      connection.properties.push(new JNPaletteNode(selectedNodeType, JNDevicePropertyNode,
        JNDevicePropertyPaletteModel.createProperty(deviceType, deviceProperty)));
    })
    return connection;
  }
}