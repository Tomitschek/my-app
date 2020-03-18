import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AnamneseModel} from '../../../../shared/models/anamnese.model';
import {PatientService} from '../../../../shared/patient.service';

@Component({
  selector: 'app-patient-detail-anamnese',
  templateUrl: './patient-detail-anamnese.component.html',
  styleUrls: ['./patient-detail-anamnese.component.css']
})

export class PatientDetailAnamneseComponent implements OnInit {
  @Input() timelineEventId: string;
  @Input() patId: string;


  anamnese$: Observable<AnamneseModel>;

  constructor(private fs: PatientService) {
  }

  ngOnInit() {
    this.anamnese$ = this.fs.getAnamnese(this.patId, this.timelineEventId);
  }

}
