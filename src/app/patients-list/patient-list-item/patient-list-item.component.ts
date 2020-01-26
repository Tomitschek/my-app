import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Patient} from '../patient.model';
import {PatientsListService} from '../patients-list.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.css']
})
export class PatientListItemComponent implements OnInit {
  @Input() patient: Patient;
  @Output() patientClicked = new EventEmitter();
  heute: Date;

  constructor(private patientenService: PatientsListService) {
  }

  ngOnInit() {
    this.heute = new Date();
  }

  onClicked() {
    // this.patientClicked.emit();
    this.patientenService.deletePatient(this.patient.id);
  }

  getCurDate() {
    return this.heute;
  }
}
