// validate input
export interface IJNFormValidator {
  validator: () => Promise<any>;
  errorName: string;
  msg?: string;
}
