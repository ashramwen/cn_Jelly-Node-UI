import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod } from '@angular/http';
import { JNConfig } from '../../jn-config';

export interface ILocation {
  location: String;
  displayName: String;
  subLocations: Array<ILocation>;
}

@Injectable()
@ResourceParams({
  url: JNConfig.apis.LOCATION_TAGS
})
export class BeehiveLocation extends Resource {

  @ResourceAction({
    isArray: true
  })
  getTop: ResourceMethod<any, ILocation[]>;

}
