import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface OperationModel {
  id?: string;
  opid?: string;
  start?: Timestamp | Date;
  end?: Timestamp | Date;
  operateur?: string;
  ops?: string;
  op_bezeichnung?: string;
  blutverlust?: number;
  septisch?: boolean;
  notfall?: boolean;
  op_saal?: boolean;
  aImage: string;
}
