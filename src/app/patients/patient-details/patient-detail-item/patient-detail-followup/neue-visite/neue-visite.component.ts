import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {UiService} from '../../../../../shared/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, last} from 'rxjs/operators';


@Component({
  selector: 'app-neue-visite',
  templateUrl: './neue-visite.component.html',
  styleUrls: ['./neue-visite.component.css']
})
export class NeueVisiteComponent implements OnInit {
  isLinear = false;
  visiteForm: FormGroup;
  allgFormGroup: FormGroup;
  verfahrenFormGroup: FormGroup;
  medikamenteFormGroup: FormGroup;

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

    this.visiteForm = this.fb.group({
      start: currDateTime,
      end: '',
      type: 'Visite'
    });

    this.allgFormGroup = this.fb.group({
      nrs_gesamt: '',
      schmerz_mobil: '',
      schmerz_resp: '',
      schmerz_schlaf: '',
      mobilisierungsgrad: '',
      sedierungsgrad: ''
    });
    this.verfahrenFormGroup = this.fb.group({
      nrs_ruhe: '',
      nrs_bel: '',
      neuro_hypaesthesie: '',
      neuro_paraesthesie: '',
      neuro_pathie: '',
      neuro_mot: '',
      infekt_kateg: '',
      neuro_haemat: '',
      neuro_horner: '',
      neuro_haemat_epidural: '',
      neuro_tns: '',
      neuro_pdph: '',
      neuro_blutpatch: ''
    });

    this.medikamenteFormGroup = this.fb.group({
      laufrate_neu: '',
      bolus_neu: '',
      intervall_neu: '',
      boli_erhalten: '',
      boli_abgefordert: ''
    });
  }

  onStepChange(event: any): void {
    console.log(event.selectedIndex);
    this.visiteForm.patchValue({end: new Date()});

  }

  async submitHandler() {
    this.isLoading = true;
    this.visiteForm.patchValue({end: new Date()});

    const formValue = this.visiteForm.value;
    try {
      await this.afs.collection(`/Patienten/${this.patientId}/TimelineElements/`)
        .add(formValue)
        .then(docRef => {
          console.log(docRef.id);
          const visite = {
            ...this.allgFormGroup.value,
            ...this.verfahrenFormGroup.value,
            ...this.medikamenteFormGroup.value,
            aImage: this.imagePath
          };
          console.log(visite);
          this.afs.collection(`/Patienten/${this.patientId}/Visite/`)
            .doc(docRef.id)
            .set(visite);
        });
      this.success = true;
      this.uis.showSnackbar('neue Visite gespeichert', null, 1500);
      await this.router.navigate([`patientdetails/${this.patientId}`]);

    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
}
