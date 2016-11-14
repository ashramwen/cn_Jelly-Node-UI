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
import { JNDevicePropertyPaletteModel } from '../device-property-node/device-property-node-palette-model';

export class JNDeviceTypePaletteModel extends IJNPaletteModel {

  static instance = new JNDeviceTypePaletteModel();

  protected init(inputDeviceType?) {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas);

    this.nodes = IJNPaletteService.getNodes(JNDeviceTypeNode);
    let connection;
    if (inputDeviceType) {
      connection = JNDevicePropertyPaletteModel.createConnection(JNDeviceTypeNode, inputDeviceType);
      this.connections.push(connection);
    } else {
      deviceTypes.forEach(function (deviceType) {
        connection = JNDevicePropertyPaletteModel.createConnection(JNDeviceTypeNode, deviceType);
        this.connections.push(connection);
      })
    }

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
    deviceTypes.forEach(function (deviceType) {
      connection.properties.push(new IJNPaletteNode(selectedNodeType, JNDeviceTypeNode,
        JNDeviceTypePaletteModel.createProperty(deviceType)))
    })
    return connection;
  }
}
