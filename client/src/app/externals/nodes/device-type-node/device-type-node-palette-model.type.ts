import { JNPaletteModel } from '../../../views/palette/interfaces';
import { RuleApplication } from '../../rule-application-core';
import { JNDeviceTypeNode } from './device-type-node.type';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { JNDevicePropertyNodePaletteModel } from '../device-property-node/device-property-node-palette-model.type';
import { JNPaletteConnection } from '../../../views/palette/interfaces/palette-connections.type';
import { JNPaletteNode } from '../../../views/palette/interfaces/palette-node.type';

export class JNDeviceTypeNodePaletteModel extends JNPaletteModel {

  protected createConnections(): JNPaletteConnection[] {
    let typeName = (<JNDeviceTypeNode>this.node).body.typeName;
    if (!typeName) return [];

    let schemas = RuleApplication.instance.resources.$schema.schemas;
    let deviceProperties = Object.keys(schemas[typeName].content.statesSchema.properties);
    let connection = new JNPaletteConnection();
    connection.title = '设备属性';
    connection.properties = [];
    deviceProperties.forEach((deviceProperty) => {
      let data: Object = {};
      data = {
        typeName: typeName,
        property: deviceProperty
      };
      connection.properties.push(new JNPaletteNode(<typeof JNBaseNode>this.node.constructor, JNDevicePropertyNode,
        JNBaseNode.getName(JNDevicePropertyNode, data), data));
    });

    return [connection];
  }
}
