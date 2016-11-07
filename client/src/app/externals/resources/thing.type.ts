import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod, Http, Headers } from '@angular/http';
import { JNConfig, BEEHIVE_HEADERS } from '../../jn-config';
import { CacheContextService } from '../../core/services/cache-context.service';
import { BeehiveResource } from './beehive-resource.type';
import { AuthenHelperSerivce } from '../services/authen-helper.service';
import { inject } from '@angular/core/testing';

export interface IThing {
  thingID: number;
  vendorThingID: String;
}

export interface IThingRequest {
  type: String;
  locationPrefix: String;
  includeSubLevel: boolean;
}

@Injectable()
@ResourceParams({
  url: JNConfig.apis.THING
})
export class BeehiveThing extends BeehiveResource {

  @ResourceAction({
    isArray: true,
    method: RequestMethod.Post,
    path: '/thingQuery'
  })
  query: ResourceMethod<IThingRequest, IThing[]>;

  constructor(
    http: Http,
    injector: Injector,
    authHelper: AuthenHelperSerivce,
    private cacheContext: CacheContextService) {
    super(http, injector, authHelper);
  }

}
