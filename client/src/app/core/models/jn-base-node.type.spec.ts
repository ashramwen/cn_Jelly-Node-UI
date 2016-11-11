import { CoreModule } from '../../core/core.module';

import { TestBed, async, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNNode } from '../../core/models/node-annotation';
import { JNNodeModel } from './jn-node-model.type';
import { JNNodeUnconnectableException } from './exceptions/node-unconnectable-exception.type';
import { Serializable } from '../../../bin/JsonMapper';
import { JNApplication } from '../services/application-core.service';

@Serializable()
class JNTestNodeModel extends JNNodeModel {
  value: number = 0;
}

@JNNode({
  title: 'JNTestNode2',
  icon: 'icon',
  color: 'color',
  borderColor: 'borderColor',
  accepts: [],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
class JNTestNode2 extends JNBaseNode {

  protected model: JNTestNodeModel = new JNTestNodeModel;

  protected whenReject() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve({});
      // resolve(this.model.serialize());
    });
  }

  protected formatter(): any {
    return this.model.serialize();
  }

  protected parser(data: Object) {
    return new Promise((resolve) => {
      resolve({});
      // resolve(JNTestNodeModel.deserialize(data));
    });
  }

  protected listener() {

  }
}

@JNNode({
  title: 'JNTestNode1',
  icon: 'icon',
  color: 'color',
  borderColor: 'borderColor',
  accepts: [JNTestNode2],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
class JNTestNode1 extends JNBaseNode {

  protected model: JNTestNodeModel = new JNTestNodeModel;

  protected whenReject() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected formatter(): any {
    return this.model.serialize();
  }

  protected parser(data: Object) {
    return new Promise((resolve) => {
      resolve(JNTestNodeModel.deserialize(data));
    });
  }

  protected listener(payload) {
    this.model.value = payload.value + 1;
  }
}


describe('JN base node', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
  });

  it('Should Connectable when accepted', () => {
      let device = new JNTestNode1();
      expect(device.connectable(new JNTestNode2)).toEqual(null);
  });

  it('Should Unconnectable when not accepted', () => {
    let device = new JNTestNode2();
    expect(!!device.connectable(new JNTestNode1).message).toEqual(true);
  });

  it('Should alert Error', () => {
    let device1 = new JNTestNode1();
    let device2 = new JNTestNode2();

    try {
      device2.accept(device1);
    } catch (e) {
      expect(e instanceof JNNodeUnconnectableException).toEqual(true);
    }
  });

  /*    
  it('Should have input flow', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let device1 = new JNTestNode1(application);
        let device2 = new JNTestNode2(application);

        device1.accept(device2);

        device2.update({ value: 2 });

        setTimeout(() => {
          expect(device1.body['value']).toEqual(3);
        }, 1000);
      })
  ));
  */
});

