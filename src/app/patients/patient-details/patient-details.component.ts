import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../patients-list/patient.model';
import {PatientsListService} from '../patients-list/patients-list.service';

@Component({
  selector: 'app-patients-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  @Input() patient: Patient;

  constructor(
    private route: ActivatedRoute,
    private  patientService: PatientsListService
  ) {

  }

  ngOnInit() {
    this.getPatient();
  }

  getPatient() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.patientService.getPatient(id)
      .subscribe(patient => this.patient = patient);
  }
}
