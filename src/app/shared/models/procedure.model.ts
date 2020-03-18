import * as firebase from 'firebase';

export interface ProcedureModel {
  id?: string;
  procId?: string;
  verfahren?: string;
  material?: string;
  status?: string;
  aImage: string;
}
