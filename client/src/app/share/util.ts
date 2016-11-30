export class JNUtils {

  static isBlank(val: any) {
    return (val === null || val === undefined);
  }

  static toArray<T>(obj): { key: string, value: T }[] {
    if (!obj) return [];
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }

  static removeItem<T>(arr: Array<T>, v: T) {
    if (arr.indexOf(v) === -1) return;
    arr.splice(arr.indexOf(v), 1);
  }

  static log(...args) {
    console.log.apply(this, arguments);
  }

  static debug(...args) {
    console.log.apply(this, arguments);
  }

  static warning(...args) {
    console.log.apply(this, arguments);
  }

  static clone(obj) {
    var o;
    if (typeof obj == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(JNUtils.clone(obj[i]));
          }
        } else {
          o = {};
          for (var k in obj) {
            o[k] = JNUtils.clone(obj[k]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  }
}
