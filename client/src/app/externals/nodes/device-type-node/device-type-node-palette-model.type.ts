import { IJNPaletteModel } from '../../../views/palette/interfaces';
import { RuleApplication } from '../../rule-application-core';
import { JNDeviceTypeNode } from './device-type-node.type';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { IJNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { IJNPaletteNode } from '../../../views/palette/palette-node.type';
import { JNUtils } from '../../../share/util';
import { IJNPaletteService } from '../../services/palette.service';
import { JNDevicePropertyPaletteModel } from '../device-property-node/device-property-node-palette-model.type';

export class JNDeviceTypePaletteModel extends IJNPaletteModel {
  nodes = [];
  connections = [];


  constructor() {
    super();
    this.init();
  }

  public init(inputDeviceType?) {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas);
    this.nodes = IJNPaletteService.getNodes(JNDeviceTypeNode);
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

  static createConnection(selectedNodeType: typeof JNBaseNode): IJNPaletteConnection {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas);
    let connection = new IJNPaletteConnection();

    connection.title = "Device Type";
    connection.properties = [];
    deviceTypes.forEach(function (deviceType) {
      if (schemas[deviceType]) {
        connection.properties.push(new IJNPaletteNode(selectedNodeType, JNDeviceTypeNode,
          JNDeviceTypePaletteModel.createProperty(deviceType)))
      }
    })
    return connection;
  }
}
