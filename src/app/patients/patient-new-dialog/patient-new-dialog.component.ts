import {Component, OnInit} from '@angular/core';
import {PatientsListService} from '../../shared/patients-list.service';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-patient-new-dialog',
  templateUrl: './patient-new-dialog.component.html',
  styleUrls: ['./patient-new-dialog.component.css']
})
export class PatientNewDialogComponent implements OnInit {

  constructor(private patientListService: PatientsListService,
              public dialogRef: MatDialogRef<PatientNewDialogComponent>) {
    console.log('Dialog Construktor');
  }


  ngOnInit() {
    console.log('FormInit');

  }

  onSubmit(form: NgForm) {
    console.log('PatOK');
    this.patientListService.addPatient({
      id: form.value.id,
      name: form.value.name,
      vorname: form.value.vorname,
      geburtsdatum: form.value.geburtsdatum,
      geschlecht: form.value.geschlecht,
      opDatum: form.value.geburtsdatum
    });
    // To Do: Check Id unique

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
