import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../shared/patient.model';
import {Observable, Subscription} from 'rxjs';
import {PatientService} from '../../shared/patient.service';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit, OnDestroy {

  patientId: string;
  patient$: Observable<Patient>;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private fs: PatientService) {
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
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
