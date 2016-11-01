import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod } from '@angular/http';
import { JNConfig } from '../../jn-config';
import { BeehiveResource } from './beehive-resource.type';

export interface ILocation {
  location: String;
  displayName: String;
  subLocations: Array<ILocation>;
}

@Injectable()
@ResourceParams({
  url: JNConfig.apis.LOCATION_TAGS
})
export class BeehiveLocation extends BeehiveResource {

  @ResourceAction({
    isArray: true,
    method: RequestMethod.Get,
    headers: {
      authorization: 'Bearer super_token',
      contentType: 'application/json'
    }
  })
  getAll: ResourceMethod<any, ILocation[]>;

}
