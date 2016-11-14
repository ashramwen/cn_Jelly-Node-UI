import { JNTextControl } from './text/text.component';
import { JNTextAreaControl } from './textarea/textarea.component';
import { JNRadioControl } from './radio/radio.component';
import { JNSelectControl } from './select/select.component';
import { JNSelectSetControl } from './select-set/select-set.component';
import { JNCheckTableControl } from './check-table/check-table.component';
import { EXTERNAL_CONTROLS } from '../../../../externals/controls/index';

export const JNCONTROLS = [JNTextControl, JNTextAreaControl, JNRadioControl,
  JNSelectControl, JNSelectSetControl, JNCheckTableControl, ...EXTERNAL_CONTROLS];
