import { ILocation } from '../../resources/location.type';
import { RuleApplication } from '../../rule-application-core';
import { JNUtils } from '../../../share/util';

export class LocationNodeService {

  static instance = new LocationNodeService();
  labels = ['楼号', '层号', '区域', '区块', '工位'];

  buildSet(value, depth) {
    let locationTree: ILocation = RuleApplication.instance.resources.$location.data;
    let labels = this.labels;
    let set = [];
    for (let i = 0; i < depth; i++) {
      let subLocations = locationTree;
      for (let j = 0; j < i; j++) {
        subLocations = subLocations.subLocations[value[j]];
      }
      if (!subLocations
        || !subLocations.subLocations
        || !Object.keys(subLocations.subLocations).length) break;

      let options = JNUtils.toArray(subLocations.subLocations).map((location) => {
        return {
          text: (<ILocation>location.value).location,
          value: (<ILocation>location.value).location
        };
      });

      options.unshift({ text: 'terms.pleaseSelect', value: '' });

      set.push({
        label: labels[i],
        options: options,
        fieldName: i.toLocaleString()
      });
    }
    return set;
  }
}
