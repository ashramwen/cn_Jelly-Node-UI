import { Injectable } from '@angular/core';
import { IFlow } from '../../../core/models/interfaces/flow.interface';

@Injectable()
export class EditStack {
  public _doStack: Array<IFlow>;
  public _undoStack: Array<IFlow>;

  constructor() {
    this._doStack = [];
    this._undoStack = [];
  }

  do(f: IFlow) {
    this._doStack.push(f);
    this._undoStack = [];
  }

  get undoable() {
    return !!this._doStack.length;
  }

  get redoable() {
    return !!this._undoStack.length;
  }

  undo() {
    let f = this._doStack.pop();
    return f;
  }

  redo() {
    let f = this._undoStack.pop();
    return f;
  }
}