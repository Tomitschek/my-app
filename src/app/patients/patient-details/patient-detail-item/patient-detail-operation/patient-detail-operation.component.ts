import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PatientService} from '../../../../shared/patient.service';
import {OperationModel} from '../../../../shared/models/operation.model';

@Component({
  selector: 'app-patient-detail-operation',
  templateUrl: './patient-detail-operation.component.html',
  styleUrls: ['./patient-detail-operation.component.css']
})
export class PatientDetailOperationComponent implements OnInit {
  @Input() timelineEventId: string;
  @Input() patId: string;

  operation$: Observable<OperationModel>;

  constructor(private fs: PatientService) {
  }

  ngOnInit() {
    this.operation$ = this.fs.getOperation(this.patId, this.timelineEventId);
  }

}
