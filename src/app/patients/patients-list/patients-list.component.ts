import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Patient} from '../../shared/patient.model';
import {MatDialog} from '@angular/material';
import {PatientNewDialogComponent} from '../patient-new-dialog/patient-new-dialog.component';
import {FirestoreService} from '../../shared/firestore.service';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit, OnDestroy {
  newPatient: Patient;
  patientsList$: Observable<Patient[]>;


  constructor(private fs: FirestoreService, public newPatDialog: MatDialog) {
  }

  ngOnInit() {
    this.patientsList$ = this.fs.getPatients();
    console.log('onInitPatList');
  }

  ngOnDestroy(): void {

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
