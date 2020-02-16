import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../shared/patient.model';
import {PatientsListService} from '../../shared/patients-list.service';
import {Observable, Subscription} from 'rxjs';
import {FirestoreService} from '../../shared/firestore.service';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit, OnDestroy {
  // @Input() patient: Patient;

  patientId: string;
  patient$: Observable<Patient>;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientListService: PatientsListService,
    private fs: FirestoreService,
  ) {
  }

  ngOnInit() {
    console.log('onInit Patienten Details');
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.patientId = params.get('id');
        this.patient$ = this.fs.getPatient(this.patientId);
      })
    );
    console.log(this.patientId);

    /*  this.subs.push(
      this.patient$
        .pipe(
          map(patient => {
            if (patient.geburtsdatum) {
              const timestamp = patient.geburtsdatum as Timestamp;
              patient.geburtsdatum = timestamp.toDate();
            }
            return patient;
          })
        )
        .subscribe(patient => {
          this.patient = {
            id: patient.id,
            name: patient.name,
            vorname: patient.vorname,
            geburtsdatum: patient.geburtsdatum,
            geschlecht: patient.geschlecht,
            opDatum: patient.opDatum,
            operation: patient.operation,
            verfahren: patient.verfahren,
            station: patient.station,
            isolation: patient.isolation
          };
        })


      ); */
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
