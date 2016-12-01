import { Injectable } from '@angular/core';
import { BeehiveThing } from './thing.type';
import { BeehiveLocation } from './location.type';
import { BeehiveSchema } from './schema.type';

@Injectable()
export class ResourceService {

  constructor(
    public $thing: BeehiveThing,
    public $location: BeehiveLocation,
    public $schema: BeehiveSchema
  ) { }
}
