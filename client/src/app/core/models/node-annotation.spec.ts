import {
  ApplicationContextService,
  CacheContextService,
  ConfigContextService
} from '../../core/services';
import { CoreModule } from '../../core/core.module';

import { TestBed, async, inject } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNNode } from '../../core/models/node-annotation';


@JNNode({
  icon: 'icon',
  color: 'color',
  borderColor: 'borderColor',
  accepts: [],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
export class JNTestNode2 extends JNBaseNode {

  protected model;

  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected whenRejected() {
    return null;
  }

  protected formatter(): Object {
    return this.model.serialize();
  }

  protected parser(data: Object) {
    return null;
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
export class JNTestNode1 extends JNBaseNode {

  protected model;

  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected whenRejected() {
    return null;
  }

  protected formatter(): Object {
    return this.model.serialize();
  }

  protected parser(data: Object) {
    return null;
  }

  protected listener() {

  }
}


describe('Node Annotation', function () {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
  });

  it('node annotation setting', () => {
    expect(JNTestNode1.icon === 'icon'
      && JNTestNode1.color === 'color'
      && JNTestNode1.borderColor === 'borderColor'
    ).toEqual(true);
  });

  it('Should have accepts', function () {
    // expect(JNTestNode1.accepts.length).toEqual(1);
    expect(JNTestNode1.accepts[0]).toEqual(JNTestNode2);
  });

});

