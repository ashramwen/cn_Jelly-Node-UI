
export class SVGUtils {
  static getTranslateX(element) {
    let translate = element.attributes.getNamedItem('transform')
      .value.match(/translate\(.*\)/)[0];
    if (!translate || !translate[0]) return 0;
    let translateX = translate.match(/\(.*\,/)[0];
    translateX = translateX.substr(1, translateX.length - 2);
    return ~~translateX;
  }

  static getTranslateY(element) {
    let translate = element.attributes.getNamedItem('transform')
      .value.match(/translate\(.*\)/)[0];
    if (!translate || !translate[0]) return 0;
    let translateY = translate.match(/,.*\)/)[0];
    translateY = translateY.substr(1, translateY.length - 2);
    return ~~translateY;
  }

  static getWith(element) {
    return ~~element.attributes.getNamedItem('width').value;
  }

  static getHeight(element) {
    return ~~element.attributes.getNamedItem('height').value;
  }
};