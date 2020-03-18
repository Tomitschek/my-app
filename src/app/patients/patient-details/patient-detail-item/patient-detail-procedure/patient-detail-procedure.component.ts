import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PatientService} from '../../../../shared/patient.service';
import {ProcedureModel} from '../../../../shared/models/procedure.model';

@Component({
  selector: 'app-patient-detail-procedure',
  templateUrl: './patient-detail-procedure.component.html',
  styleUrls: ['./patient-detail-procedure.component.css']
})
export class PatientDetailProcedureComponent implements OnInit {
  @Input() timelineEventId: string;
  @Input() patId: string;

  procedure$: Observable<ProcedureModel>;

  constructor(private fs: PatientService) {
  }

  ngOnInit() {
    this.procedure$ = this.fs.getProcedure(this.patId, this.timelineEventId);
  }

}
