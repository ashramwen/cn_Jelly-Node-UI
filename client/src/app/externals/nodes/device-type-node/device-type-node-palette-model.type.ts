import { JNPaletteModel } from '../../../views/palette/interfaces';
import { RuleApplication } from '../../rule-application-core';
import { JNDeviceTypeNode } from './device-type-node.type';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNPaletteNode } from '../../../views/palette/palette-node.type';
import { JNUtils } from '../../../share/util';
import { JNDevicePropertyPaletteModel } from '../device-property-node/device-property-node-palette-model.type';

export class JNDeviceTypePaletteModel extends JNPaletteModel {
  nodes = [];
  connections = [];

  constructor() {
    super();
    this.init();
  }

  public init(inputDeviceType?) {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas);
    this.nodes = JNPaletteModel.getNodes(JNDeviceTypeNode);
    this.connections = [];

    let connection = {};
    let connections = [];
    if (inputDeviceType) {
      connection = JNDevicePropertyPaletteModel.createConnection(JNDeviceTypeNode, inputDeviceType);
      this.connections.push(connection);
    } else {
      deviceTypes.forEach(function (deviceType) {
        if (schemas[deviceType]) {
          connection = JNDevicePropertyPaletteModel.createConnection(JNDeviceTypeNode, deviceType);
          connections.push(connection);
        }
      })
    }
    this.connections = connections;

  }

  static createProperty(value: string): Object {
    let property = {
      "typeName": value
    }
    return property;
  }

  static getName(nodeType: new () => JNBaseNode, data?: any): string {
    return JNBaseNode.factory(nodeType, data).name;
  }

  static createConnection(selectedNodeType: typeof JNBaseNode): JNPaletteConnection {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas);
    let connection = new JNPaletteConnection();
    let data: Object = {};

    connection.title = "Device Type";
    connection.properties = [];
    deviceTypes.forEach(function (deviceType) {
      data = JNDeviceTypePaletteModel.createProperty(deviceType);
      if (schemas[deviceType]) {
        connection.properties.push(new JNPaletteNode(selectedNodeType, JNDeviceTypeNode,
          JNBaseNode.getName(JNDeviceTypeNode, data)));
      }
    })
    return connection;
  }
}
