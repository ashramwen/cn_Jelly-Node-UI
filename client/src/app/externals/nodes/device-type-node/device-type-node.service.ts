import { RuleApplication } from '../../rule-application-core';

export interface IThingTable {
  location: string;
  vendorThingID: string;
  thingID: number;
}

export class DeviceTypeNodeService {
  static instance = new DeviceTypeNodeService;

  getThings(locations: string[], typeName: string): Promise<IThingTable[]> {
    return new Promise((resolve, reject) => {
      let promises = locations.map((location) => {
        let requestParam = {
          type: typeName,
          locationPrefix: location,
          includeSubLevel: true
        };

        return RuleApplication.instance.resources.$thing.query(requestParam, (data) => {
          data.forEach((row) => {
            row['location'] = row.vendorThingID;
          });
        }).$observable.toPromise();
      });

      Promise.all(promises).then((rowsSet) => {
        let tableRows = [];
        rowsSet.forEach((rows) => {
          tableRows = tableRows.concat(rows);
        });
        resolve(tableRows);
      });
    });
  }
}
