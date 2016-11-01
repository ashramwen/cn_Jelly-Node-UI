export abstract class JNNodeException extends Error {
  abstract message: string;
  abstract code: number;
}
