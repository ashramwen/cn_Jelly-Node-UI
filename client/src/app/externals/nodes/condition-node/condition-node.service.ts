import { JNConditionNodeModel } from './condition-node-model.type';
import { RuleApplication } from '../../rule-application-core';
import { ISchemaProperty } from '../../resources/schema.type';
import { IPropertyConditionsInput, IPropertyCondition } from '../../controls/property-condition/property-condition.component';

export class ConditionNodeService {
  static instance = new ConditionNodeService;

  buildConditions(data: JNConditionNodeModel): IPropertyCondition[] {
    let schema = RuleApplication.instance.resources.$schema.schemas[data.typeName];
    if (!data.typeName || !schema) return [];
    return data.conditions.map((condition) => {
      let propertySchema = schema.content.statesSchema.properties[condition.property];
      return {
        text: propertySchema.displayNameCN,
        value: condition.value,
        property: condition.property,
        type: this.getControlType(propertySchema),
        operator: condition.operator,
        options: this.buildEnumOptions(propertySchema),
        aggregation: condition.aggregation
      };
    });
  }

  private getControlType(propertySchema: ISchemaProperty): 'value'| 'enum'| 'range' {
    switch (propertySchema.type) {
      case 'boolean':
        return 'enum';
      case 'string':
        return 'value';
      case 'int':
      case 'float':
        if (propertySchema.enum) return 'enum';
        return 'range';
      default:
        return 'range';
    }
  }

  private buildEnumOptions(propertySchema: ISchemaProperty): Array<{text: string, value: any}> {
    if (this.getControlType(propertySchema) !== 'enum') return [];
    if (propertySchema.enum) {
      return Object.keys(propertySchema.enum).map(key => {
        return {
          text: key,
          value: propertySchema.enum[key]
        };
      });
    }

    return [{
      text: '是',
      value: true
    }, {
      text: '否',
      value: false
    }];
  }
}
