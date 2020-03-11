import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface OperationModel {
  id?: string;
  opid?: string;
  opBegin?: Timestamp;
  opEnd?: Timestamp;
  opDiagnose?: string;
  opProcedur?: string;
  blutVerlust?: number;
}
