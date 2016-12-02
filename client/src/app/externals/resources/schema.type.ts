import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod, Http, Headers } from '@angular/http';
import { JNConfig, BEEHIVE_HEADERS } from '../../jn-config';
import { BeehiveResource } from './beehive-resource.type';
import { AuthenHelperSerivce } from '../services/authen-helper.service';
import { CacheContextService } from '../../share/services/cache-context.service';

export interface IType {
  type: string;
}

export interface ISchemaRequest {
  thingType: string;
  name: string;
  version: number;
}

export interface ISchemaProperty {
  displayNameCN: string;
  enum?: { [key: string]: string | number };
  maximum?: number;
  minimum?: number;
  type: 'int' | 'float' | 'string' | 'boolean';
  unit: string;
  enumType: string;
}

export interface ISchemaAction {
  displayNameCN: string;
  'in': {
    type: 'object';
    title: string;
    required: string[];
    properties?: {
      [key: string]: ISchemaProperty;
    };
  };
  out: {
    type: 'object';
    title: string;
  };
}

export interface ISchema {
  id: number;
  createDate: number;
  modifyDate: number;
  createBy: string;
  modifyBy: string;
  schemaType: 'industrytemplate';
  thingType: string;
  name: string;
  version: string;
  content?: {
    statesSchema?: {
      type: 'object';
      title: string;
      properties: {
        [key: string]: ISchemaProperty;
      };
    };
    actions?: {
      [key: string]: ISchemaAction;
    };
  };
}

const CACHE_SCHEMA = 'beehive.schema';

@Injectable()
@ResourceParams({
  url: JNConfig.apis.SCHEMA
})
export class BeehiveSchema extends BeehiveResource {

  types: string[];
  schemas: {
    [key: string]: ISchema
  };

  @ResourceAction({
    isArray: true,
    method: RequestMethod.Get,
    url: JNConfig.apis.TYPE,
    path: ''
  })
  getTypes: ResourceMethod<Object, IType[]>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/query/industrytemplate'
  })
  get: ResourceMethod<ISchemaRequest, ISchema>;

  constructor(
    http: Http,
    injector: Injector,
    authHelper: AuthenHelperSerivce,
    private cacheContext: CacheContextService) {
    super(http, injector, authHelper);
  }

  cacheAll() {
    return new Promise((resolve, reject) => {
      this.getTypes({}, (types) => {

        this.types = types.map(type => type.type);

        let requests: ISchemaRequest[] = this.types.map((type) => {
          return { thingType: type, name: type, version: 1 };
        });

        requests = requests.filter((request) => {
          return !this.isCached(request);
        });

        let promises = requests.map((request) => {
          return this.get(request)
            .$observable
            .toPromise();
        });

        Promise.all(promises)
          .then((schemas) => {
            schemas.forEach((schema, i) => {
              if (this.validateSchema(schema)) {
                this.cacheSchema(requests[i], schema);
              }
            });
            resolve();
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  validateSchema(schema: ISchema) {
    if (!schema || !schema.thingType || !schema.content || !schema.content.statesSchema) return false;
    return true;
  }

  restoreSchemas() {
    this.schemas = this.schemas || {};
    this.types.forEach((type) => {
      let schema = this.getSchema(type);
      if (!this.validateSchema(schema)) return;
      this.schemas[type] = schema;
    });
  }

  cacheSchema(request: ISchemaRequest, schema: ISchema) {
    let key = [CACHE_SCHEMA, request.thingType].join('.');
    this.cacheContext.set(key, schema);
  }

  isCached(request: ISchemaRequest) {
    let key = [CACHE_SCHEMA, request.thingType].join('.');
    return this.cacheContext.get(key);
  }

  getSchema(type: string) {
    return this.cacheContext.get([CACHE_SCHEMA, type].join('.'));
  }

}
