import { Component, OnInit } from '@angular/core';
import {Patient} from './patient.model';
import {PatientService} from './patient.service';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  heute: Date;

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.patients = this.patientService.getAvailablePatients();
    this.heute = new Date();
  }

  getCurDate() {
    return this.heute;
  }
}
