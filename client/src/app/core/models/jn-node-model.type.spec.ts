/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CoreModule } from '../core.module';
import { Serializable, JsonProperty } from '../../../bin/JsonMapper';
import { JNNodeModel } from './jn-node-model.type';
import { INodeBody } from './interfaces/node-body.interface';

////////  SPECS  /////////////

interface ITest extends INodeBody {
    testName: string;
    testProperty: number;
}

@Serializable()
class TestModel extends JNNodeModel<ITest> {

    @JsonProperty('serialName')
    testName: string;

    @JsonProperty({
        name: 'testProperty',
        deserialize: (value: number) => {
            return value - 1;
        },
        serialize: (value: number) => {
            return value + 1;
        }
    })
    testProperty: number;

    constructor() {
        super();
        this.testName = null;
        this.testProperty = null;
    }
}

describe('Node Data Model ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CoreModule]});
  });

  it('model deserialize', () => {
      let model = <TestModel>TestModel.deserialize({
          serialName: 'myName',
          testProperty: 1
      });
      expect(true).toEqual(true);
      console.log(model.testName);
      // expect(model.testName).toEqual('myName');
      expect(model.testProperty).toEqual(0);
  });

  /*    
  it('model serialize', () => {
    let model = <TestModel>TestModel.deserialize({
      serialName: 'myName',
      testProperty: 1
    });
    let result = model.serialize();
    expect(result.serialName).toEqual('myName');
    expect(result.testProperty).toEqual(1);
  });
  */

});
