import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {UiService} from '../../../../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {concatMap, last} from 'rxjs/operators';

@Component({
  selector: 'app-neue-anamnese',
  templateUrl: './neue-anamnese.component.html',
  styleUrls: ['./neue-anamnese.component.css']
})
export class NeueAnamneseComponent implements OnInit {
  isLinear = false;
  allgFormGroup: FormGroup;
  schmerzFormGroup: FormGroup;
  komorbFormGroup: FormGroup;
  immunFormGroup: FormGroup;
  gerinnungFormGroup: FormGroup;
  anamneseForm: FormGroup;

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

  get medisForms() {
    return this.gerinnungFormGroup.get('medis') as FormArray;
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
    this.imagePath = '';
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.patientId = params.get('id');
      })
    );

    this.allgFormGroup = this.fb.group({
      groesse: '',
      gewicht: '',
      asa: '',
      isolation: ''
    });
    this.schmerzFormGroup = this.fb.group({
      cps: '',
      bs: '',
      ts: '',
      opioide: '',
      nsaids: '',
      nrs_ruhe_prae: '',
      nrs_bel_prae: ''
    });

    this.komorbFormGroup = this.fb.group({
      diabetes: '',
      hba1c: '',
      pavk: '',
      rheuma: '',
      alkohol: '',
      drogen: '',
      infektion_praeop: '',
      sepsis: '',
      antibiose_praeop: '',
      niereninsuff: false,
      krea: '',
      gfr: '',
      leberinsuff: ''
    });
    this.immunFormGroup = this.fb.group({
      immun_steroide: '',
      immun_suppressiva: '',
      immun_tx: '',
      immun_tumor: '',
      immun_erkrank: ''
    });

    this.gerinnungFormGroup = this.fb.group({
      gerinnung: '',
      thrombos: '',
      ptt: '',
      inr: '',
      anti_xa: '',
      antikoag: '',
      medis: this.fb.array([])
    });

    this.anamneseForm = this.fb.group({
      start: currDateTime,
      end: '',
      type: 'Anamnese'
    });
  }

  addMedi() {
    const medi = this.fb.group({
      name: [],
      dosis: [],
      beendet: []
    });
    this.medisForms.push(medi);
    console.log('AddMedi');
  }

  deleteMedi(i) {
    this.medisForms.removeAt(i);
  }

  async submitHandler() {
    this.isLoading = true;
    this.anamneseForm.patchValue({end: new Date()});

    const formValue = this.anamneseForm.value;


    try {
      await this.afs.collection(`/Patienten/${this.patientId}/TimelineElements/`)
        .add(formValue)
        .then(docRef => {
          console.log(docRef.id);
          const anamnese = {
            ...this.allgFormGroup.value,
            ...this.schmerzFormGroup.value,
            ...this.komorbFormGroup.value,
            ...this.immunFormGroup.value,
            ...this.gerinnungFormGroup.value,
            aImage: this.imagePath
          };
          console.log(anamnese);
          this.afs.collection(`/Patienten/${this.patientId}/Anamnese/`)
            .doc(docRef.id)
            .set(anamnese);
        });
      this.success = true;
      this.uis.showSnackbar('neue Anamnese gespeichert', null, 1500);
      await this.router.navigate([`patientdetails/${this.patientId}`]);

    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
}
