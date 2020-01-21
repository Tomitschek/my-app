import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Patient } from '../patienten.model';
import { PatientenService } from '../patienten.service';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Input() patient: Patient;
  @Output() patientClicked = new EventEmitter();
  heute: Date;

  constructor(private patientenService: PatientenService) {
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
