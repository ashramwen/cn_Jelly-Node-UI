/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CoreModule } from '../core/core.module';
import { Events } from '../core/services/event.service';
import { APP_READY } from '../core/services/application-core.service';


////////  SPECS  /////////////

describe('rule application core', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CoreModule]});
  });

  it('should app ready', async(inject([Events], (events: Events) => {
    events.on(APP_READY, (value) => {
      expect(true).toEqual(true);
    });
  })));

});
