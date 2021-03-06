import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Patient} from '../../shared/models/patient.model';
import {MatDialog} from '@angular/material/dialog';
import {PatientNewDialogComponent} from '../patient-new-dialog/patient-new-dialog.component';
import {PatientService} from '../../shared/patient.service';
import {User} from '../../core/auth/user.model';
import {AuthService} from '../../core/auth/auth.service';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  newPatient: Patient;
  attachedPatientsList$: Observable<Patient[]>;
  unattachedPatientsList$: Observable<Patient[]>;
  patientsList$: Observable<Patient[]>;
  subs: Subscription[] = [];
  user: User;

  constructor(private patientService: PatientService,
              public newPatDialog: MatDialog,
              public auth: AuthService) {
  }

  ngOnInit() {
    this.patientsList$ = this.patientService.getPatients();
    this.attachedPatientsList$ = this.patientService.getAttachedPatients(this.auth.userkey);
    this.unattachedPatientsList$ = this.patientService.getAttachedPatients('');
    console.log('onInitPatList');
    this.auth.user$.subscribe(aUser => {
      this.user = aUser;
    });
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
