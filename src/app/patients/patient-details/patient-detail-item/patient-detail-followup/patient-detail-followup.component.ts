import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PatientService} from '../../../../shared/patient.service';
import {FollowupModel} from '../../../../shared/models/followup.model';
import {faStethoscope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-patient-detail-followup',
  templateUrl: './patient-detail-followup.component.html',
  styleUrls: ['./patient-detail-followup.component.css']
})
export class PatientDetailFollowupComponent implements OnInit {
  @Input() timelineEventId: string;
  @Input() patId: string;
  faStethoscope = faStethoscope;

  visite$: Observable<FollowupModel>;

  constructor(private fs: PatientService) {
  }

  ngOnInit() {
    this.visite$ = this.fs.getVisite(this.patId, this.timelineEventId);
  }
}
