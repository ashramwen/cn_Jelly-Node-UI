/* tslint:disable:no-unused-variable */
import { CoreModule } from '../../core/core.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { AuthenHelperSerivce } from './authen-helper.service';
import { RuleApplication } from '../rule-application-core';
import { Events } from '../../core/services/event.service';



////////  SPECS  /////////////

describe('Authen Helper', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });

  it('should login', async(
    inject([AuthenHelperSerivce, JNApplication, Events],
      (authHelper: AuthenHelperSerivce, application: JNApplication, events: Events) => {
        events.on(APP_READY, () => {
          authHelper.hasLoggedIn().then(() => {
            expect(true).toEqual(true);
          }, () => {
            expect(false).toEqual(true);
          });
        });
      })
  ));

});
