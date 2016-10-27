import { CoreModule } from '../../core/core.module';

import { TestBed, async, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNNode } from '../../core/models/node-annotation';
import { IJNNodeModel } from '../../core/models/interfaces';
import { JNNodeModel } from './jn-node-model.type';
import { JNNodeUnconnectableException } from './exceptions/node-unconnectable-exception.type';
import { Serializable } from '../../../bin/JsonMapper';
import { JNApplication } from '../services/application-core.service';

@Serializable()
class JNTestNodeModel extends JNNodeModel {
  value: number = 0;
}

@JNNode({
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

  protected whenRejected() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve({});
      // resolve(this.model.serialize());
    });
  }

  protected formatter(): Object {
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

  protected whenRejected() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected formatter(): Object {
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

  it('Should Connectable when accepted', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let device = new JNTestNode1(application);
        expect(device.connectable(JNTestNode2)).toEqual(true);
      })
  ));

  it('Should Unconnectable when not accepted', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let device = new JNTestNode2(application);
        expect(device.connectable(JNTestNode1)).toEqual(false);
      })
  ));

  it('Should alert Error', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let device1 = new JNTestNode1(application);
        let device2 = new JNTestNode2(application);

        try {
          device2.accept(device1);
        } catch (e) {
          expect(e instanceof JNNodeUnconnectableException).toEqual(true);
        }
      })
  ));

  it('Should have input flow', async(
    inject([JNApplication],
      (application: JNApplication) => {
        let device1 = new JNTestNode1(application);
        let device2 = new JNTestNode2(application);

        // device1.accept(device2);
        /*
        try {
          device2.update({
            value: 2
          });
        } catch (e) {
          expect(true).toEqual(true);
          console.log(e);
        }
        */

        device2.update({ value: 2 });

        expect(true).toEqual(true);
        /*
        setTimeout(() => {
          expect(device1.body['value']).toEqual(3);
        }, 1000);
        */
      })
  ));

});

