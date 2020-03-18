import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


import {AngularfirebaseService} from './angularfirebase.service';
import {Patient} from './models/patient.model';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import {TimelineElement} from './models/timeline-element.model';
import {AnamneseModel} from './models/anamnese.model';
import {OperationModel} from './models/operation.model';
import {ProcedureModel} from './models/procedure.model';
import {FollowupModel} from './models/followup.model';
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

  getAttachedPatients(userId: string): Observable<Patient[]> {
    // Start Using AngularFirebase Service!!
    console.log('getPatients');
    return this.afb.colWithIds$<Patient[]>('Patienten',
      ref => ref.where('attachedTo', '==', userId)).pipe(
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

  getTimeline(patId: string): Observable<TimelineElement[]> {
    console.log(patId);
    return this.afb.colWithIds$<TimelineElement[]>(`Patienten/${patId}/TimelineElements`, ref => ref.orderBy('start'))
      .pipe(
        map(actions => actions.map(timelineElement => {
          if (timelineElement.start) {
            const start = timelineElement.start as Timestamp;
            timelineElement.start = start.toDate();
            const end = timelineElement.end as Timestamp;
            timelineElement.end = end.toDate();
          }
          return timelineElement;
        }))
      );
  }

  getAnamnese(patId: string, timelineId: string): Observable<AnamneseModel> {
    console.log('getAnamnese');
    return this.afb.doc$<AnamneseModel>(`Patienten/${patId}/Anamnese/${timelineId}`).pipe(
      map(anamnese => {
        if (anamnese.start) {
          const timestamp = anamnese.start as Timestamp;
          anamnese.start = timestamp.toDate();
        }
        return anamnese;
      }));
  }

  getOperation(patId: string, timelineId: string): Observable<OperationModel> {
    console.log('getOperation');
    return this.afb.doc$<OperationModel>(`Patienten/${patId}/Operationen/${timelineId}`).pipe(
      map(operation => {
        if (operation.start) {
          const timestamp = operation.start as Timestamp;
          operation.start = timestamp.toDate();
        }
        return operation;
      }));
  }

  getProcedure(patId: string, timelineId: string): Observable<ProcedureModel> {
    console.log('getProcedure');
    return this.afb.doc$<ProcedureModel>(`Patienten/${patId}/Proceduren/${timelineId}`);
  }

  getVisite(patId: string, timelineId: string): Observable<FollowupModel> {
    console.log('getVisiten');
    return this.afb.doc$<FollowupModel>(`Patienten/${patId}/Visiten/${timelineId}`);
  }
}


