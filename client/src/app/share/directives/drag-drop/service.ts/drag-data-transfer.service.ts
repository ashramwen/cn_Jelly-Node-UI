import { Inject } from '@angular/core';

@Inject('')
export class DragDataTransferService {
  private _data: any;
  private _scope: any;

  set scope(scope) {
    this._scope = scope;
  }

  get scope() {
    return this._scope;
  }

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }
}
