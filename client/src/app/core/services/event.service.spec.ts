/* tslint:disable:no-unused-variable */

import { TestBed, inject, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CoreModule } from '../core.module';
import { Events } from './event.service';
import { APP_READY } from './application-core.service';


////////  SPECS  /////////////

describe('app events ', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [CoreModule]});
  });

  it('should emit value', async(inject([Events], (events: Events) => {
    events.on('ev', (value) => {
      expect(value).toEqual('a');
    });

    events.emit('ev', 'a');

  })));

  it('should emit value backward', async(inject([Events], (events: Events) => {
    events.emit('ev', 'a');

    events.on('ev', (value, initial) => {
      expect(value).toEqual('a');
      expect(initial).toEqual(true);
    });
  })));

});
