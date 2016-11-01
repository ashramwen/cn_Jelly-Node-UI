/* tslint:disable:no-unused-variable */
import { JNDeviceTypeNode } from './device-type-node.type';
import { CoreModule } from '../../../core/core.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JNApplication } from '../../../core/services/application-core.service';

////////  SPECS  /////////////

describe('Device Type Node', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });

  it('should init', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let device = new JNDeviceTypeNode(application);
        expect(device instanceof JNDeviceTypeNode).toEqual(true);
      })
  ));

  it('should init default value', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let deviceType = new JNDeviceTypeNode(application);
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
          // expect(deviceType['model'].typeName).toEqual('Lighting');
          // console.log(JSON.stringify(deviceType.body));
          // expect(deviceType.body['typeName']).toEqual('Lighting');
          expect(deviceType.body['position']).toEqual({ x: 100, y: 100 });
        });
      })
  ));
});
