import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface FollowupModel {
  id?: string;
  patRef?: string;
  begin?: Timestamp;
  end?: Timestamp;
  sessionRef?: string;
  proceduren: string[];
}
