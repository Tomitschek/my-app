import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {UiService} from '../../../../../shared/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, last} from 'rxjs/operators';

@Component({
  selector: 'app-neue-procedure',
  templateUrl: './neue-procedure.component.html',
  styleUrls: ['./neue-procedure.component.css']
})
export class NeueProcedureComponent implements OnInit {

  procedureForm: FormGroup;
  procedureDetailForm: FormGroup;

  isLoading = false;
  success = false;
  subs: Subscription[] = [];
  patientId: string;
  uploadPercent$: Observable<number>;
  imagePath: string;
  downloadURL$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private uis: UiService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  get procForms() {
    return this.procedureDetailForm.get('procs') as FormArray;
  }

  uploadFile(event) {
    const file: File = event.target.files[0];
    const filePath = `patients/${this.patientId}/${file.name}`;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent$ = task.percentageChanges();
    this.storage.ref(filePath).getDownloadURL();

    this.downloadURL$ = task.snapshotChanges()
      .pipe(
        last(),
        concatMap(() => this.storage.ref(filePath).getDownloadURL())
      );
    this.downloadURL$.subscribe(url => {
      this.imagePath = url;
    });
  }

  ngOnInit(): void {
    const currDateTime = new Date();
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.patientId = params.get('id');
      })
    );
    console.log('NeueOP');
    this.procedureForm = this.fb.group({
      start: currDateTime,
      end: '',
      type: 'Procedure'

    });
    this.procedureDetailForm = this.fb.group({
      arzt: '',
      procs: this.fb.array([])

    });
  }

  addProc() {
    const proc = this.fb.group({
      name: [],
      material: [],
      status: []
    });
    this.procForms.push(proc);
    console.log('AddProc');
  }

  deleteProc(i) {
    this.procForms.removeAt(i);
  }

  async submitHandler() {
    this.isLoading = true;
    console.log(this.procedureForm.value);
    try {
      await this.afs.collection(`/Patienten/${this.patientId}/TimelineElements/`)
        .add(this.procedureForm.value)
        .then(docRef => {
          console.log(docRef.id);
          const procedure = {
            ...this.procedureDetailForm.value,
            aImage: this.imagePath
          };
          console.log(procedure);
          // ToDo: Update Patient
          this.afs.collection(`/Patienten/${this.patientId}/Proceduren/`)
            .doc(docRef.id) // gleiche Id wie correspondierendes TimelineElelement //
            .set(procedure);
        });
      this.success = true;
      this.uis.showSnackbar('neue procedure gespeichert', null, 1500);
      await this.router.navigate([`patientdetails/${this.patientId}`]);

    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
}
