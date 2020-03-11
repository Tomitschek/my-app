import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {UiService} from '../../../../../shared/ui.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-neue-anamnese',
  templateUrl: './neue-anamnese.component.html',
  styleUrls: ['./neue-anamnese.component.css']
})
export class NeueAnamneseComponent implements OnInit {
  anamneseForm: FormGroup;
  isLoading = false;
  success = false;
  subs: Subscription[] = [];
  patientId: string;
  uploadPercent$: Observable<number>;

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
    task.snapshotChanges()
      .subscribe(console.log);
  }

  ngOnInit(): void {
    const begin = new Date();
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.patientId = params.get('id');
      })
    );
    this.anamneseForm = this.fb.group({
      start: begin,
      end: '',
      type: 'Anamnese'
    });
  }


  async submitHandler() {
    this.isLoading = true;
    this.anamneseForm.patchValue({end: new Date()});

    const formValue = this.anamneseForm.value;

    try {
      await this.afs.collection(`/Patienten/${this.patientId}/TimelineElements/`).add(formValue);
      this.success = true;
      this.uis.showSnackbar('neue Anamnese gespeichert', null, 1500);
      this.router.navigate([`patientdetails/${this.patientId}`]);
    } catch (err) {
      console.log(err);
    }
    this.isLoading = false;
  }
}
