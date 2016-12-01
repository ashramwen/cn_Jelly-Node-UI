import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod, Http } from '@angular/http';
import { JNConfig } from '../../jn-config';
import { CacheContextService } from '../../core/services/cache-context.service';
import { IFlow } from '../../core/models/interfaces/flow.interface';
import { JNNodeResource } from './node-resource.type';
import { JNAuthenHelperSerivce } from '../services/authen-helper.service';

export const CACHE_LOCATION = 'beehive.location';

@Injectable()
@ResourceParams({
  url: JNConfig.backendAPI.FLOW
})
export class NodeFlowResource extends JNNodeResource {

  @ResourceAction({
    method: RequestMethod.Get,
    isArray: true
  })
  getAll: ResourceMethod<any, IFlow[]>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/{!flowID}'
  })
  get: ResourceMethod<{flowID: string}, IFlow>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/save'
  })
  save: ResourceMethod<IFlow, IFlow>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!flowID}'
  })
  update: ResourceMethod<IFlow, IFlow>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!flowID}'
  })
  delete: ResourceMethod<{flowID: string}, string>;

  constructor(http: Http, injector: Injector,
    private authHelper: JNAuthenHelperSerivce,
    private cacheContext: CacheContextService) {
    super(http, injector, authHelper);
  }
}
