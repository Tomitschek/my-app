import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Patient} from '../../shared/models/patient.model';
import {PatientService} from '../../shared/patient.service';
import {UiService} from '../../shared/ui.service';
import {AuthService} from '../../core/auth/auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-patient-new-dialog',
  templateUrl: './patient-new-dialog.component.html',
  styleUrls: ['./patient-new-dialog.component.css']
})
export class PatientNewDialogComponent implements OnInit, OnDestroy {

  newPatient: Patient;
  userId: string;
  subs: Subscription[];

  constructor(private fs: PatientService,
              private uis: UiService,
              public dialogRef: MatDialogRef<PatientNewDialogComponent>,
              private auth: AuthService) {

    console.log('Dialog Construktor');
  }

  ngOnInit() {
    console.log('FormInit');
  }

  onSubmit(form: NgForm) {
    console.log('PatOK');
    this.savePatChanges(form);
    this.uis.showSnackbar('neue Anamnese gespeichert', null, 1500);
    // To Do: Check Id unique

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async savePatChanges(form: NgForm) {
    this.newPatient = {
      pid: form.value.pid,
      name: form.value.name,
      vorname: form.value.vorname,
      geburtsdatum: form.value.geburtsdatum,
      geschlecht: form.value.geschlecht,
      created: this.auth.userkey,
      attachedTo: ''
    };
    await this.fs.savePatient(this.newPatient);
    // To Do: Errorhandling
  }

  ngOnDestroy(): void {

  }
}


