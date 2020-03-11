import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Patient} from '../../shared/models/patient.model';
import {PatientService} from '../../shared/patient.service';


@Component({
  selector: 'app-patient-new-dialog',
  templateUrl: './patient-new-dialog.component.html',
  styleUrls: ['./patient-new-dialog.component.css']
})
export class PatientNewDialogComponent implements OnInit {

  newPatient: Patient;

  constructor(private fs: PatientService,
              public dialogRef: MatDialogRef<PatientNewDialogComponent>) {
    console.log('Dialog Construktor');
  }

  ngOnInit() {
    console.log('FormInit');

  }

  onSubmit(form: NgForm) {
    console.log('PatOK');
    this.savePatChanges(form);

    // To Do: Check Id unique

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async savePatChanges(form: NgForm) {
    this.newPatient = ({
      pid: form.value.pid,
      name: form.value.name,
      vorname: form.value.vorname,
      geburtsdatum: form.value.geburtsdatum,
      geschlecht: form.value.geschlecht
    });
    await this.fs.savePatient(this.newPatient);
  }

}


