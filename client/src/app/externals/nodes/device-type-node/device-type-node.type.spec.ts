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

import { By } from '@angular/platform-browser';

////////  SPECS  /////////////

describe('Device Type Node', function () {

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

  it('should init', async(
    inject([ApplicationContextService, CacheContextService, ConfigContextService],
      (appContext: ApplicationContextService, cacheContext: CacheContextService, configContext: ConfigContextService) => {
        let device = new JNDeviceTypeNode(appContext, configContext, cacheContext);
        expect(device instanceof JNDeviceTypeNode).toEqual(true);
      })
  ));

  it('should has static member', () => {
    expect(
      JNDeviceTypeNode.icon === '' &&
      JNDeviceTypeNode.color === ''
    ).toEqual(true);
  });

  it('should init default value', async(
    inject([ApplicationContextService, CacheContextService, ConfigContextService],
      (appContext: ApplicationContextService, cacheContext: CacheContextService, configContext: ConfigContextService) => {
        let deviceType = new JNDeviceTypeNode(appContext, configContext, cacheContext);
        deviceType.init({
          typeName: 'Lighting',
          typeDisplayName: '灯泡',
          position: {
            x: 100,
            y: 100
          },
          nodeID: 123,
          nodeName: '类型-灯泡'
        }).then(() => {
          expect(deviceType['model'].typeName).toEqual('Lighting');
          // console.log(JSON.stringify(deviceType.body));
          // expect(deviceType.body['typeName']).toEqual('Lighting');
          // expect(deviceType.body['position']).toEqual({ x: 100, y: 100 });
        });
      })
  ));
});
