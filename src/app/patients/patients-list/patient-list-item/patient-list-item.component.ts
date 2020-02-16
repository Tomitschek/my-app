import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from '../../../shared/patient.model';


@Component({
  selector: 'app-patient-list-item',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.css']
})
export class PatientListItemComponent implements OnInit {
  @Input() patient: Patient;
  @Output() patientClicked = new EventEmitter();
  heute: Date;

  constructor() {
  }

  ngOnInit() {
    this.heute = new Date();
    console.log('init ListItem');
  }

  getCurDate() {
    return this.heute;
  }
}
