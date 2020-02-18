import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Patient} from '../../shared/patient.model';
import {MatDialog} from '@angular/material';
import {PatientNewDialogComponent} from '../patient-new-dialog/patient-new-dialog.component';
import {PatientService} from '../../shared/patient.service';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  newPatient: Patient;
  patientsList$: Observable<Patient[]>;
  subs: Subscription[] = [];

  constructor(private fs: PatientService, public newPatDialog: MatDialog) {
  }

  ngOnInit() {
    this.patientsList$ = this.fs.getPatients();
    console.log('onInitPatList');
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  openDialog(): void {
    const dialogRef = this.newPatDialog.open(PatientNewDialogComponent, {
      width: '90%',
      disableClose: true,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newPatient = result;
      console.log(this.newPatient);
    });
  }
}
