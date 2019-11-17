import { Component, OnInit } from '@angular/core';
import { PatientService} from './patient/patient.service';
import {Patient} from './patient/patient.model';


@Component({
  selector: 'app-patienten',
  templateUrl: './patienten.component.html',
  styleUrls: ['./patienten.component.css']
})
export class PatientenComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {
  }

  ngOnInit() {
    this.patients = this.patientService.getAvailablePatients();
  }

  addEvent() {
    console.log('Add what?');
  }
}
