import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


import {AngularfirebaseService} from './angularfirebase.service';
import {Patient} from './patient.model';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private afb: AngularfirebaseService) {
  }

  // Getters

  getPatient(patId: string): Observable<Patient> {
    console.log('getPatient');
    return this.afb.doc$<Patient>(`Patienten/${patId}`).pipe(
      map(patient => {
        if (patient.geburtsdatum) {
          const timestamp = patient.geburtsdatum as Timestamp;
          patient.geburtsdatum = timestamp.toDate();
        }
        return patient;
      }));
  }

  getPatients(): Observable<Patient[]> {
    // Start Using AngularFirebase Service!!
    console.log('getPatients');
    return this.afb.colWithIds$<Patient[]>('Patienten').pipe(
      map(actions => actions.map(patient => {
        if (patient.geburtsdatum) {
          const timestamp = patient.geburtsdatum as Timestamp;
          patient.geburtsdatum = timestamp.toDate();
        }
        return patient;
      })));
  }

  // Updates
  updatePatient(patient: Patient): Promise<void> {
    return this.afb.update(`Patienten/${patient.id}`, patient);
  }

  savePatient(patient: Patient): Promise<firebase.firestore.DocumentReference> {
    console.log('savePatient');
    console.log(patient);
    return this.afb.add(`Patienten`, patient);
  }
}
