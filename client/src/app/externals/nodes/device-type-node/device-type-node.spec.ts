/* tslint:disable:no-unused-variable */
import { JNDeviceTypeNode } from './device-type-node.type';
import { CoreModule } from '../../../core/core.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JNApplication } from '../../../core/services/application-core.service';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { AppModule } from '../../../app.module';

////////  SPECS  /////////////

describe('Device Type Node', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });

  it('should init', () => {
    let device = new JNDeviceTypeNode();
    expect(device instanceof JNDeviceTypeNode).toEqual(true);
  });

  it('should init default value', async(() => {
    let deviceType = new JNDeviceTypeNode();
    deviceType.init({
      typeName: 'Lighting',
      typeDisplayName: '灯泡',
      position: {
        x: 100,
        y: 100
      },
      nodeID: 123,
      nodeName: '类型-灯泡'
    });
    expect(deviceType.body.position).toEqual({ x: 100, y: 100 });
  }));

  it('accpet location node', async(() => {
    let deviceNode = new JNDeviceTypeNode();
    let locationNode = new JNLocationNode();

    deviceNode.init({
      typeName: 'Lighting',
      typeDisplayName: '灯泡',
      nodeID: 123,
      nodeName: '类型-灯泡'
    });
    expect(deviceNode.connectable(locationNode)).toEqual(null);
  }));

  it('should not accpet two location nodes', async(() => {

    let flow = new JNFlow();
    let deviceNode = flow.createNode(JNDeviceTypeNode);
    let locationNode1 = flow.createNode(JNLocationNode);
    let locationNode2 = flow.createNode(JNLocationNode);

    deviceNode.init({
      typeName: 'Lighting',
      typeDisplayName: '灯泡',
      nodeID: 123,
      nodeName: '类型-灯泡'
    });
    deviceNode.accept(locationNode1);
    expect(!!deviceNode.connectable(locationNode2)).toEqual(true);
  }));

});
