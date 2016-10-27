import { Injectable } from '@angular/core';
import { JNBaseNode } from '../models/jn-base-node.type';
import { ApplicationContextService } from './application-context.service';
import { CacheContextService } from './cache-context.service';
import { ConfigContextService } from './config-context.service';
import { Http } from '@angular/http';

@Injectable()
export abstract class JNApplication {

  nodes: Array<JNBaseNode> = [];

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http
  ) { }

  loader() {
    return Promise.all([this.lazyLoading]);
  }

  protected abstract lazyLoading(): Promise<boolean>;

  status(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
