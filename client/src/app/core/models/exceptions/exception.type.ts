export abstract class JNException extends Error {
  abstract message: string;
  abstract code: number;
}
