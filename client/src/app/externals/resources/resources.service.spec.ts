/* tslint:disable:no-unused-variable */
import { CoreModule } from '../../core/core.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JNApplication, APP_READY } from '../../core/services/application-core.service';
import { BeehiveThing } from './thing.type';
import { Events } from '../../core/services/event.service';

////////  SPECS  /////////////

describe('Resources', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });

  it('things', async(inject([BeehiveThing, JNApplication, Events],
    ($thing: BeehiveThing, application: JNApplication, events: Events) => {
      events.on(APP_READY, () => {
        $thing.query({
          type: 'Lighting',
          locationPrefix: '08',
          includeSubLevel: true
        }, (things) => {
          console.log(things);
          expect(things instanceof Array).toBe(true);
        }).$observable
        .toPromise()
        .catch(() => {
          expect(false).toEqual(true);
        });
      });
  })));
});
