import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface TimelineElement {
  id?: string;
  type?: string;
  start?: Timestamp | Date;
  end?: Timestamp | Date;
}
