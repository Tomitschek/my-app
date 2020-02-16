import {Patient} from './patient.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class PatientsListService {
  patientsChanged = new Subject<Patient[]>();

  private availablePatients: Patient[] = [];
  private activePatient: Patient;

  constructor(private db: AngularFirestore) {
  }

  addPatient(patient: Patient) {
    this.addDataToDatabase(patient);
    console.log(patient);
    /* this.availablePatients.push(patient);
    this.patientsChanged.next();
     */
  }

  fetchAvailablePatients() {
    this.db
      .collection('Patienten')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            vorname: doc.payload.doc.data()['vorname'],
            geburtsdatum: (doc.payload.doc.data()['geburtsdatum']).toDate(),
            geschlecht: doc.payload.doc.data()['geschlecht'],
            opDatum: (doc.payload.doc.data()['opDatum']).toDate(),
            operation: doc.payload.doc.data()['operation'],
            verfahren: doc.payload.doc.data()['verfahren'],
            station: doc.payload.doc.data()['station'],
            isolation: doc.payload.doc.data()['isolation']
          };
        });
      }))
      .subscribe((patients: Patient[]) => {
        console.log('FetchAvailablePatients');
        console.log(patients);
        this.availablePatients = patients;
        this.patientsChanged.next([...this.availablePatients]);
      });
  }

  private addDataToDatabase(patient: Patient) {
    this.db.collection('Patienten').add(patient);
    console.log('add Patient');
    console.log(patient);
  }

}
