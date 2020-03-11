import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from '../../../shared/models/patient.model';


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


  constructor() {
  }

  ngOnInit() {
    this.heute = new Date();
    this.geb = this.patient.geburtsdatum as Date;
  }

  getCurDate() {
    return this.heute;
  }
}
