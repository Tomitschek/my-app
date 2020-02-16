import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface Patient {
  id?: string;
  pid?: string;
  name?: string;
  vorname?: string;
  geburtsdatum?: Timestamp | Date;
  geschlecht?: 'm' | 'w' | 'u';
  opDatum?: Timestamp | Date;
  operation?: string;
  verfahren?: Array<string>;
  station?: string;
  abteilung?: string;
  isolation?: boolean;
  state?: 'aktiv' | 'abgeschlossen' | null;
}
