import { Injectable } from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import {IJNFormValidator} from '../../interfaces/validator';
import {JNFormValidator} from '../entities/validator';

@Injectable()
export class ValidatorService{
  constructor() {
    
  }

  public generatorValidators(validators: IJNFormValidator[]): JNFormValidator[] {
    // ::TODO  
    return [];
  }
}