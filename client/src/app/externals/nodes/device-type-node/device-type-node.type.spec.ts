/* tslint:disable:no-unused-variable */
import { JNDeviceTypeNode } from './device-type-node.type';
import { LocalStorageService } from 'angular-2-local-storage';

import {
  ApplicationContextService,
  CacheContextService,
  ConfigContextService
} from '../../../core/services';
import { CoreModule } from '../../../core/core.module';

import { TestBed, async, inject } from '@angular/core/testing';

import { By }             from '@angular/platform-browser';

////////  SPECS  /////////////

describe('AppComponent with TCB', function () {
  let appContext, cacheContext, configContext;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });

  it('input should equals output', inject([ApplicationContextService, CacheContextService, ConfigContextService],
    (appContext: ApplicationContextService, cacheContext: CacheContextService, configContext: ConfigContextService) => {
      appContext.set('a', 100);
      expect(appContext.get('a')).toEqual(100);
  }));

  /*  
  it('should init', async(() => {
    let deivce = new JNDeviceTypeNode();
    expect(h1.innerText).toMatch(/angular app/i, '<h1> should say something about "Angular App"');
  }));
  */

});
