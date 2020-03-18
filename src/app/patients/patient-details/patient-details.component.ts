import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../shared/models/patient.model';
import {Observable, Subscription} from 'rxjs';
import {PatientService} from '../../shared/patient.service';
import {TimelineElement} from '../../shared/models/timeline-element.model';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PatientDetailAddItemNavComponent} from './patient-detail-add-item-nav/patient-detail-add-item-nav.component';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit, OnDestroy {

  patientId: string;
  patient$: Observable<Patient>;
  timelineElements$: Observable<TimelineElement[]>;
  subs: Subscription[] = [];

// get Dates; for each get timeline(Date)

  constructor(
    private route: ActivatedRoute,
    private fs: PatientService,
    private bottomSheet: MatBottomSheet) {
  }

  ngOnInit() {
    console.log('onInit Patienten Details');
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.patientId = params.get('id');
        this.patient$ = this.fs.getPatient(this.patientId);
        this.timelineElements$ = this.fs.getTimeline(this.patientId);
      })
    );
    console.log(this.patientId);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(PatientDetailAddItemNavComponent, {
      data: {patId: this.patientId}
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
