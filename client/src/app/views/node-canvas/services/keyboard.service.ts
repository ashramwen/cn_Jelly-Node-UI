import { Injectable } from '@angular/core';
import { JNUtils } from '../../../share/util';

const SPECIAL_KEYS = {
  shift: { read: 'shiftKey' },
  ctrl: { read: 'ctrlKey' },
  alt: { read: 'altKey' },
  meta: { read: 'metaKey' }
};

enum EVENT_TYPES {
  KEY_DOWN, KEY_UP
};

export enum CANVAS_COMMANDS {
  REMOVE, UNDO, ENABLE_DRAG_MOVE, DISABLED_DRAG_MOVE, COPY, PASTE
};

@Injectable()
export class JNKeyboardService {

  private commands: { keyCombo: string[]; commandName: CANVAS_COMMANDS; type: EVENT_TYPES }[] = [{
    keyCombo: ['Backspace'],
    commandName: CANVAS_COMMANDS.REMOVE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['z', 'Meta'],
    commandName: CANVAS_COMMANDS.UNDO,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['h'],
    commandName: CANVAS_COMMANDS.ENABLE_DRAG_MOVE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['h'],
    commandName: CANVAS_COMMANDS.DISABLED_DRAG_MOVE,
    type: EVENT_TYPES.KEY_UP
  }, {
    keyCombo: ['Meta', 'c'],
    commandName: CANVAS_COMMANDS.COPY,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: ['Meta', 'v'],
    commandName: CANVAS_COMMANDS.PASTE,
    type: EVENT_TYPES.KEY_DOWN
  }];

  keydown(e: KeyboardEvent) {
    return this.matchEvent(e, EVENT_TYPES.KEY_DOWN);
  }

  keyup(e: KeyboardEvent) {
    return this.matchEvent(e, EVENT_TYPES.KEY_UP);
  }

  matchEvent(e: KeyboardEvent, type: EVENT_TYPES) {
    let commands = this.commands.filter(m => m.type === type);
    
    commands = commands.filter(c => {

      let specialKeys: { [key: string]: { wanted: boolean, pressed: boolean } } = {
        shift: { wanted: false, pressed: false },
        ctrl: { wanted: false, pressed: false },
        alt: { wanted: false, pressed: false },
        meta: { wanted: false, pressed: false }
      };

      c.keyCombo.forEach(k => {
        if (specialKeys[k]) {
          specialKeys[k].wanted = true;
        }
      });

      for (let key in specialKeys) {
        specialKeys[key].pressed = e[SPECIAL_KEYS[key].read];
        if (specialKeys[key].pressed
          !== specialKeys[key].wanted) return false;
      }
      return true;
    });

    return commands.find(c => c.keyCombo.indexOf(e.key) > -1);
  }
}
