import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientenService } from './patienten.service';
import { Patient } from './patienten.model';


@Component({
  selector: 'app-patienten',
  templateUrl: './patienten.component.html',
  styleUrls: ['./patienten.component.css']
})
export class PatientenComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  private patientsSubscription: Subscription;

  constructor(private patientenService: PatientenService) {
  }

  ngOnInit() {
    this.patients = this.patientenService.getAvailablePatients();
    this.patientsSubscription = this.patientenService.patientsUpdated.subscribe(() => {
      this.patients = this.patientenService.getAvailablePatients();
    });
  }
  ngOnDestroy(): void {
    this.patientsSubscription.unsubscribe();
  }

  addEvent() {
    console.log('Add what?');
    this.patientenService.addPatient(
      {id: 3, name: 'von Katzenellenbogen',
        vorname: 'Johanna',
        geburtsdatum: new Date('1973-12-12'),
        geschlecht: 'w',
        opDatum: new Date('2019-10-10'),
        operation: 'OSG Fraktur',
        verfahren: ['DIK', 'SNB'],
        station: 'OUC-S2',
        isolation: true
      }
    );
  }

  onPatientClicked(patient) {
    console.log(patient);
  }
}
