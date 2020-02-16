import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


import {AngularfirebaseService} from './angularfirebase.service';
import {Patient} from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afb: AngularfirebaseService) {
  }

  // Getters

  getPatient(patId: string): Observable<Patient> {
    console.log('getPatient');
    return this.afb.doc$<Patient>(`Patienten/${patId}`);
  }

  getPatients(): Observable<Patient[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Patient[]>('Patienten');
  }

  // Updates
  updatePatient(patient: Patient): Promise<void> {
    return this.afb.update('Patienten/${patient.id}', patient);
  }
}
