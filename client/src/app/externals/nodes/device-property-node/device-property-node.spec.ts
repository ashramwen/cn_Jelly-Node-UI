/* tslint:disable:no-unused-variable */
import { CoreModule } from '../../../core/core.module';
import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JNFlow } from '../../../core/models/jn-flow.type';
import { Events } from '../../../core/services/event.service';
import { APP_READY } from '../../../core/services/application-core.service';
import { JNDevicePropertyNode } from './device-property-node.type';
import { JNUtils } from '../../../share/util';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { AppModule } from '../../../app.module';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNNodeUnconnectableException } from '../../../core/models/exceptions/node-unconnectable-exception.type';

////////  SPECS  /////////////

describe('Device Property Node', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    // appContext = new ApplicationContextService;
    // cacheContext = new CacheContextService(new LocalStorageService);
  });


  it('Should Connectable when accepted', async(() => {
    setTimeout(function() {
      let device = new JNDevicePropertyNode();
      expect(device.connectable(new JNDeviceTypeNode)).toEqual(null);
    }, 100);
  }));

  it('Should Unconnectable when not accepted', () => {
    let device = new JNDevicePropertyNode();
    expect(!!device.connectable(new JNLocationNode).message).toEqual(true);
  });

  it('Should alert Error', () => {
    let device1 = new JNDevicePropertyNode();
    let device2 = new JNLocationNode();

    try {
      device2.accept(device1);
    } catch (e) {
      expect(e instanceof JNNodeUnconnectableException).toEqual(true);
    }
  });

  it('when device type changed', async(inject([Events], (events: Events) => {
    events.on(APP_READY, () => {
      let data = require('../../../../assets/example.json');
      let flow = new JNFlow;
      let node: JNDevicePropertyNode;

      flow.loadData(data);
      for (let n of flow.nodes) {
        if (n instanceof JNDevicePropertyNode) {
          node = n;
          break;
        }
      }
      let sourceNode = JNUtils.toArray<JNDeviceTypeNode>(node.nodeMap.accepted)
        .map(pair => pair.value)
        .find(n => n instanceof JNDeviceTypeNode);
      sourceNode.update({ typeName: null });

      setTimeout(() => {
        expect(node.body['typeName']).toEqual(false);
      });
    });
  })));
});
