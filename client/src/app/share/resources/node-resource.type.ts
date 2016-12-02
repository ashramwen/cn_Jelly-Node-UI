import { Injectable, Injector } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { RequestMethod, Http, Request, Response } from '@angular/http';
import { JNConfig } from '../../jn-config';
import { JNAuthenHelperSerivce } from '../services/authen-helper.service';
import { Observable, Subscriber } from 'rxjs';

export interface ILocation {
  location: String;
  displayName: String;
  subLocations: Array<ILocation>;
}

export class JNNodeResource extends Resource {

  constructor(http: Http, injector: Injector, private authenHelper: JNAuthenHelperSerivce) {
    super(http, injector);
  }

  getHeaders(): any {
    let headers = super.getHeaders();
    // Extending our headers with Authorization
    headers = this.authenHelper.extendHeaders(headers);
    return headers;
  }

  requestInterceptor(req: Request): Request {
    if (req.method === RequestMethod.Post
      || req.method === RequestMethod.Put
      || req.method === RequestMethod.Patch) {
      req.headers.set('content-type', 'application/json');
    }
    req.url = JNConfig.backednUrl + req.url;
    return req;
  }

  responseInterceptor(observable: Observable<any>, request?: Request): Observable<any> {
    return Observable.create((subscriber: Subscriber<any>) => {
      observable.subscribe(
        (res: Response) => {
          subscriber.next((<any>res)._body ? res.json() : null);
        },
        (error: Response) => {
          if (error.status === 401) {
            this.authenHelper.clearToken();
          }
          subscriber.error(error);
        },
        () => subscriber.complete()
      );
    });
  }
}
