import { Injectable } from '@angular/core';
import { ApplicationContextService } from './application-context.service';
import { CacheContextService } from './cache-context.service';
import { ConfigContextService } from './config-context.service';
import { Http } from '@angular/http';
import { JNConfig } from '../../jn-config';
import { Observable, Subscriber } from 'rxjs';
import { Events } from './event.service';
import { IJsonMetaData } from '../../../bin/JsonMapper';
import { JNBaseNode } from '../../core/models/jn-base-node.type';

export const APP_READY = 'app_ready';

@Injectable()
export abstract class JNApplication {

  static instance: JNApplication;

  nodes: Array<JNBaseNode> = [];
  nodeTypeMapper: {
    [key: string]: typeof JNBaseNode
  } = {};

  constructor(
    public applicationContext: ApplicationContextService,
    public cacheContext: CacheContextService,
    public configContext: ConfigContextService,
    public http: Http,
    public events: Events
  ) {
    JNApplication.instance = this;
    this._init();
  }

  public status(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  /**
   * @returns void
   * @desc init app setting;
   */
  protected abstract init(): Promise<any>;

  /**
   * @returns Promise
   * @desc load resources
   */
  protected abstract lazyLoading(): Promise<boolean>;

  /**
   * @desc init service
   */
  private _init() {
    this._loadConfig()
      .then(this._validateToken.bind(this))
      .then(this.init.bind(this))
      .then(this._loader.bind(this))
      .then(this._onReady.bind(this), this._onError.bind(this));
  }

  private _loadConfig() {
    return new Promise((resolve) => {
      let configContent = JNConfig;
      Object.keys(configContent).forEach((key, value) => {
        this.cacheContext.set(key, value);
      });
      resolve(true);
    });
  }

  private _validateToken() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  private _onReady() {
    this.events.emit(APP_READY, true);
  }

  private _onError() {

  }

  private _loader() {
    return Promise.all([this.lazyLoading()]);
  }
}
