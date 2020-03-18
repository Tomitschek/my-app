import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from '../../../shared/models/patient.model';
import {AuthService} from '../../../core/auth/auth.service';
import {PatientService} from '../../../shared/patient.service';


@Component({
  selector: 'app-patient-list-item',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.css']
})
export class PatientListItemComponent implements OnInit {
  @Input() patient: Patient;
  @Output() patientClicked = new EventEmitter();
  heute: Date;
  geb: Date;


  constructor(public auth: AuthService,
              private ps: PatientService) {
  }

  ngOnInit() {
    this.heute = new Date();
    this.geb = this.patient.geburtsdatum as Date;
  }

  getCurDate() {
    return this.heute;
  }

  unAttach() {
    this.patient.attachedTo = '';
    this.ps.updatePatient(this.patient);
  }

  attach() {
    this.patient.attachedTo = this.auth.userkey;
    this.ps.updatePatient(this.patient);
  }
}
