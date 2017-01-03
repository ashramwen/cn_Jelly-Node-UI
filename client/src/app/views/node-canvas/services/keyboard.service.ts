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
  REMOVE, UNDO, ENABLE_DRAG_MOVE, DISABLED_DRAG_MOVE, COPY, PASTE, CUT, SELECT_ALL, ENABLE_SHIFT, DISABLE_SHIFT
};

@Injectable()
export class JNKeyboardService {

  private commands: { keyCombo: string[][]; commandName: CANVAS_COMMANDS; type: EVENT_TYPES }[] = [{
    keyCombo: [['backspace']],
    commandName: CANVAS_COMMANDS.REMOVE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['z', 'meta'], ['z', 'ctrl']],
    commandName: CANVAS_COMMANDS.UNDO,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['h']],
    commandName: CANVAS_COMMANDS.ENABLE_DRAG_MOVE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['h']],
    commandName: CANVAS_COMMANDS.DISABLED_DRAG_MOVE,
    type: EVENT_TYPES.KEY_UP
  }, {
    keyCombo: [['meta', 'c'], ['ctrl', 'c']],
    commandName: CANVAS_COMMANDS.COPY,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['meta', 'v'], ['ctrl', 'v']],
    commandName: CANVAS_COMMANDS.PASTE,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['meta', 'x'], ['ctrl', 'x']],
    commandName: CANVAS_COMMANDS.CUT,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['meta', 'a'], ['ctrl', 'a']],
    commandName: CANVAS_COMMANDS.SELECT_ALL,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['shift']],
    commandName: CANVAS_COMMANDS.ENABLE_SHIFT,
    type: EVENT_TYPES.KEY_DOWN
  }, {
    keyCombo: [['shift']],
    commandName: CANVAS_COMMANDS.DISABLE_SHIFT,
    type: EVENT_TYPES.KEY_UP
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
      return !!c.keyCombo.find((arr) => {
         // if require key length === 1, don't handle special key
        if (arr.length === 1) return true;
        let specialKeys: { [key: string]: { wanted: boolean, pressed: boolean } } = {
          shift: { wanted: false, pressed: false },
          ctrl: { wanted: false, pressed: false },
          alt: { wanted: false, pressed: false },
          meta: { wanted: false, pressed: false }
        };

        arr.forEach(k => {
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
    });

    return commands.find((c) => {
      return !!c.keyCombo.find((combo) => {
        if (combo.length > 1 && this.isSpecialKey(e.key)) return false;
        return combo.indexOf(e.key.toLowerCase()) > -1;
      });
    });
  }

  isSpecialKey(key: string) {
    return !!SPECIAL_KEYS[key.toLowerCase()];
  }
}
