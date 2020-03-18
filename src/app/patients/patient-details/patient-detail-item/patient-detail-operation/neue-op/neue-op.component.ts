import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {UiService} from '../../../../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {concatMap, last} from 'rxjs/operators';

@Component({
  selector: 'app-neue-op',
  templateUrl: './neue-op.component.html',
  styleUrls: ['./neue-op.component.css']
})
export class NeueOpComponent implements OnInit {
  isLinear = false;

  operationForm: FormGroup;
  operationDetailForm: FormGroup;

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
    console.log('NeueOP');
    this.operationForm = this.fb.group({
      start: currDateTime,
      end: '',
      type: 'Operation'

    });
    this.operationDetailForm = this.fb.group({
      operateur: '',
      ops: '',
      op_bezeichnung: '',
      blutverlust: '',
      septisch: '',
      notfall: '',
      op_saal: '',
    });
  }


  async submitHandler() {
    this.isLoading = true;
    console.log(this.operationForm.value);
    try {
      await this.afs.collection(`/Patienten/${this.patientId}/TimelineElements/`)
        .add(this.operationForm.value)
        .then(docRef => {
          console.log(docRef.id);
          const operation = {
            ...this.operationDetailForm.value,
            aImage: this.imagePath
          };
          console.log(operation);
          this.afs.collection(`/Patienten/${this.patientId}/Operationen/`)
            .doc(docRef.id)
            .set(operation);
        });
      this.success = true;
      this.uis.showSnackbar('neue Operation gespeichert', null, 1500);
      await this.router.navigate([`patientdetails/${this.patientId}`]);

    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
}
