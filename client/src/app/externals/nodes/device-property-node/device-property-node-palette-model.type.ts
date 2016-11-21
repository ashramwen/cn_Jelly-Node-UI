import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { RuleApplication } from '../../rule-application-core';
import { JNDevicePropertyNode } from './device-property-node.type';
import { JNDeviceTypeInfoPanelModel } from '../device-type-node/device-type-node-info-panel-model.type';
import { JNDeviceTypePaletteModel } from '../device-type-node/device-type-node-palette-model.type';
import { JNPaletteConnection } from '../../../views/palette/interfaces/palette-connections.type';
import { JNPaletteNode } from '../../../views/palette/interfaces/palette-node.type';

export class JNDevicePropertyPaletteModel extends JNPaletteModel {
  nodes = [];
  connections = [];

  constructor() {
    super();
  }

  public init(body) {
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
    let deviceProperties = Object.keys(schemas[deviceType].content.statesSchema.properties);
    let connection = new JNPaletteConnection();
    let data: Object = {};
    connection.title = deviceType;
    connection.properties = [];
    deviceProperties.forEach(function (deviceProperty) {
      data = JNDevicePropertyPaletteModel.createProperty(deviceType, deviceProperty);
      connection.properties.push(new JNPaletteNode(selectedNodeType, JNDevicePropertyNode,
        JNBaseNode.getName(JNDevicePropertyNode, data), data));
    })
    return connection;
  }
}