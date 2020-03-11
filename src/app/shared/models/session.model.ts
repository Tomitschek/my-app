import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Interface {
  id?: string;
  begin?: Timestamp;
  end?: Timestamp;
}
