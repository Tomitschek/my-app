import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Interface {
  id?: string;
  patRef?: string;
  begin?: Timestamp;
}
