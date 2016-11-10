export class JNUtils {
  static isBlank(val: any) {
    return (val === null || val === undefined);
  }

  static toArray<T>(obj): {key: string, value: T}[] {
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }

  static removeItem<T>(arr: Array<T>, v: T) {
    arr.splice(arr.indexOf(v), 1);
  }
}
