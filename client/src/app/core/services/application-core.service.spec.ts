/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CoreModule } from '../core.module';
import { Events } from './event.service';
import { APP_READY, JNApplication } from './application-core.service';
import { AppModule } from '../../app.module';


////////  SPECS  /////////////

describe('app core ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CoreModule] });
    TestBed.compileComponents();
  });

  it('should init application', async(() => {
    TestBed.compileComponents().then(inject([JNApplication], (application: JNApplication) => {
      expect(JNApplication.instance === null).toEqual(false);
    }));
  }));

});
