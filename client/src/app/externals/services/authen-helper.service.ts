import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JNConfig } from '../../jn-config';
import { CacheContextService } from '../../core/services/cache-context.service';

export interface ILoginPayload {
  password: String;
  permanentToken?: boolean;
  userName: String;
}
export const CREDENTIAL = 'beehive-token';
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
    this.cacheContext.set(CREDENTIAL, credential);
  }

  /**
   * @param  {Headers} headers
   * @desc extend http headers with Authorization Header
   */
  extendHeaders(headers: Headers) {
    let credential: ICredential = this.cacheContext.get(CREDENTIAL);
    let _headers = new Headers({
      'Authorization': `Bearer ${credential.accessToken}`
    });

    headers.keys().forEach((key) => {
      _headers.set(key, headers.get(key));
    });

    return _headers;
  }

  /**
   * @desc validate user's token
   */
  hasLoggedIn(): Promise<boolean | ICredential> {
    return new Promise<boolean | ICredential>((resolve, reject) => {
      let credential: ICredential = this.cacheContext.get(CREDENTIAL);
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
    this.cacheContext.remove(CREDENTIAL);
  }

}

