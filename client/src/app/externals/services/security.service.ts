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
  id: number;
  createDate: number;
  modifyDate: number;
  createBy: number;
  modifyBy: number;
  userName: String;
  phone: String;
  mail: String;
  displayName: String;
  roleName: String;
  userID: String;
  enable: boolean;
  accessToken: String;
}

@Injectable()
export class SecurityService {

  constructor(
    private http: Http,
    private cacheContext: CacheContextService
  ) { }

  login(payload: ILoginPayload) {
    let headers = new Headers();
    payload.permanentToken = false;

    headers.append('content-type', 'application/json');
    return this.http.post(JNConfig.apis.AUTH + '/login', payload, headers)
      .map(res => res.json())
      .toPromise()
      .then((response) => {
        this.cacheContext.set(CREDENTIAL, response);
      });
  }

  hasLoggedIn(): Promise<boolean> {
    return new Promise((resolve, reject) => {
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

}

