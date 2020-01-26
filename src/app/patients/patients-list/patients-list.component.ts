import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PatientsListService} from './patients-list.service';
import {Patient} from './patient.model';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  private patientsSubscription: Subscription;

  constructor(private patientenService: PatientsListService) {
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
