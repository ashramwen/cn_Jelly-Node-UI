import {
  IJNPaletteModel
} from '../../../views/palette/interfaces';

export class JNRulePaletteModel extends IJNPaletteModel {
  static instance = new JNRulePaletteModel();

  constructor() {
    super();
  }

}
