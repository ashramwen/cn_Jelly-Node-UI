import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { RuleApplication } from '../../rule-application-core';
import { JNDevicePropertyNode } from './device-property-node.type';
import { JNDeviceTypeInfoPanelModel } from '../device-type-node/device-type-node-info-panel-model.type';
import { JNPaletteConnection } from '../../../views/palette/interfaces/palette-connections.type';
import { JNPaletteNode } from '../../../views/palette/interfaces/palette-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';

export class JNDevicePropertyNodePaletteModel extends JNPaletteModel {

  createConnections(): JNPaletteConnection[] {
    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceTypes = Object.keys(schemas);
    let connection = new JNPaletteConnection();

    connection.title = '设备种类';
    connection.properties = [];
    deviceTypes.forEach((deviceType) => {
      let data: Object = {};
      data = {
        typeName: deviceType
      };
      if (schemas[deviceType]) {
        let property = new JNPaletteNode(<typeof JNBaseNode>this.node.constructor, JNDeviceTypeNode,
          JNBaseNode.getName(JNDeviceTypeNode, data));
        connection.properties.push(property);
      }
    });

    return [connection];
  }
}
