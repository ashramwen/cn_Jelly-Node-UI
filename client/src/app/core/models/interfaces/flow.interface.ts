export interface IFlow {
  flowType: 'GenericRule' | 'EnvRule' | 'Reporting';
  flowName: string;
  flowDescription: string;
  flowID: string;
  nodes: Array<any>;
  createdBy: string;
  published: boolean;
  synchronized: boolean;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}