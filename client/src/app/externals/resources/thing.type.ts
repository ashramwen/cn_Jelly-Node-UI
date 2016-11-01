import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod, Http, Headers } from '@angular/http';
import { JNConfig, BEEHIVE_HEADERS } from '../../jn-config';
import { CacheContextService } from '../../core/services/cache-context.service';

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
export class BeehiveThing extends Resource {

  @ResourceAction({
    isArray: true,
    method: RequestMethod.Post,
    path: '/thingQuery',
    headers: {
      contentType: 'application/json'
    }
  })
  query: ResourceMethod<IThingRequest, IThing[]>;

  constructor(http: Http, injector: Injector, cacheContext: CacheContextService) {
    super(http, injector);
    let headers = new Headers(cacheContext.get(BEEHIVE_HEADERS));
    super.setHeaders(headers);
  }

}
