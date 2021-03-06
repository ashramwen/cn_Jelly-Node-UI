import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { JNConfig } from '../../jn-config';
import { CredentialException } from '../../core/models/exceptions/credential-exception.type';
import { CacheContextService } from '../../share/services/cache-context.service';

export interface ILoginPayload {
  password: String;
  permanentToken?: boolean;
  userName: String;
}
export const CACHE_CREDENTIAL = 'beehive.token';
export interface ICredential {
  id?: number;
  createDate?: number;
  modifyDate?: number;
  createBy?: number;
  modifyBy?: number;
  userName?: String;
  phone?: String;
  mail?: String;
  displayName?: String;
  roleName?: String;
  userID?: String;
  enable?: boolean;
  accessToken: String;
}

@Injectable()
export class AuthenHelperSerivce {

  constructor(
    private http: Http,
    private cacheContext: CacheContextService
  ) { }

  storeCredential(credential: ICredential) {
    this.cacheContext.set(CACHE_CREDENTIAL, credential);
  }

  /**
   * @param  {Headers} headers
   * @desc extend http headers with Authorization Header
   */
  extendHeaders(headers: Headers) {
    let credential: ICredential = this.cacheContext.get(CACHE_CREDENTIAL);
    if (!credential) {
      throw new CredentialException();
    }
    let _headers = new Headers({
      'Authorization': `Bearer ${credential.accessToken}`
    });

    Object.keys(headers).forEach((key) => {
      _headers[key] = headers[key];
    });

    return _headers;
  }

  /**
   * @desc validate user's token
   */
  hasLoggedIn(): Promise<boolean | ICredential> {
    return new Promise<boolean | ICredential>((resolve, reject) => {
      let credential: ICredential = this.cacheContext.get(CACHE_CREDENTIAL);
      if (!credential) {
        reject();
        return;
      }

      let headers = new Headers({'Authorization': `Bearer ${credential.accessToken}`});
      this.http.get(JNConfig.apis.USER + '/me', headers)
        .toPromise()
        .then(() => {
          resolve(credential);
        }, (err) => {
          reject(false);
        });
    });
  }

  clearToken() {
    this.cacheContext.remove(CACHE_CREDENTIAL);
  }

}

