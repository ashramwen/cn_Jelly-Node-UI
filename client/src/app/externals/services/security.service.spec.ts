/* tslint:disable:no-unused-variable */
import { CoreModule } from '../../core/core.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JNApplication } from '../../core/services/application-core.service';
import { SecurityService } from './security.service';



////////  SPECS  /////////////

describe('Device Type Node', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });


  /*
  it('should login', async(
    inject([SecurityService],
      (security: SecurityService) => {
        let payload = { userName: 'beehiveAdmin', password: '1qaz2wsx' };
        security.login(payload).then(() => {
          expect(true).toEqual(true);
        }).catch((err) => {
          expect(err).toEqual(true);
        });
      })
  ));
  */
});
