import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod, Http } from '@angular/http';
import { JNConfig } from '../../jn-config';
import { BeehiveResource } from './beehive-resource.type';
import { AuthenHelperSerivce } from '../services/authen-helper.service';
import { CacheContextService } from '../../core/services/cache-context.service';

export interface ILocation {
  location: string;
  displayName: string;
  subLocations: { [key: string]: ILocation };
}

export const CACHE_LOCATION = 'beehive.location';

@Injectable()
@ResourceParams({
  url: JNConfig.apis.LOCATION_TAGS
})
export class BeehiveLocation extends BeehiveResource {

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/fullTree'
  })
  getAll: ResourceMethod<any, ILocation[]>;

  constructor(http: Http, injector: Injector,
    private authHelper: AuthenHelperSerivce,
    private cacheContext: CacheContextService) {
    super(http, injector, authHelper);
  }

  cache(location) {
    this.cacheContext.set(CACHE_LOCATION, location);
  }

  get isCached(): boolean {
    return !!this.cacheContext.get(CACHE_LOCATION);
  }

  get data() {
    return this.cacheContext.get(CACHE_LOCATION);
  }
}
