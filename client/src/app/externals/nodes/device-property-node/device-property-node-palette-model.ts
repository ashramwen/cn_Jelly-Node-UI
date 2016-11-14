import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { IJNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { RuleApplication } from '../../rule-application-core';
import { JNDevicePropertyNode } from './device-property-node.type';
import { IJNPaletteNode } from '../../../views/palette/palette-node.type';
import { IJNPaletteService } from '../../services/palette.service';
import { JNDeviceTypeInfoPanelModel } from '../device-type-node/device-type-node-info-panel-model.type';
import { JNDeviceTypePaletteModel } from '../device-type-node/device-type-node-palette-model.type';

export class JNDevicePropertyPaletteModel extends IJNPaletteModel {
  static containDynamicProperties = true;

  static instance = new JNDevicePropertyPaletteModel();

  protected init() {
    this.nodes = IJNPaletteService.getNodes(JNDevicePropertyNode);
    this.connections.push(JNDeviceTypePaletteModel.createConnection(JNDevicePropertyNode));
  }

  static createProperty(deviceType: string, value: string): Object {
    let property = {
      "typeName": deviceType,
      "property": value
    }
    return property;
  }

  static createConnection(selectedNodeType: typeof JNBaseNode, deviceType: string): IJNPaletteConnection {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas[deviceType]);

    let connection = new IJNPaletteConnection();
    connection.title = "Device Property";
    deviceTypes.forEach(function (deviceProperty) {
      connection.properties.push(new IJNPaletteNode(selectedNodeType, JNDevicePropertyNode, 
      JNDevicePropertyPaletteModel.createProperty(deviceType, deviceProperty)));
    })
    return connection;
  }
}