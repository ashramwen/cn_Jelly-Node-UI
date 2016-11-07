export class JNUtils {
  static isBlank(val: any) {
    return (val === null || val === undefined);
  }

  static toArray(obj): {key: string, value: any}[] {
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }
}
