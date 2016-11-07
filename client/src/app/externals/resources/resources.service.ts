import { Injectable } from '@angular/core';
import { BeehiveThing } from './thing.type';
import { BeehiveLocation } from './location.type';

@Injectable()
export class ResourceService {

  constructor(
    public $thing: BeehiveThing,
    public $location: BeehiveLocation
  ) {
  }
}
