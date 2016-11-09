export class JNUtils {
  static isBlank(val: any) {
    return (val === null || val === undefined);
  }

  static toArray<T>(obj): {key: string, value: T}[] {
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }
}
