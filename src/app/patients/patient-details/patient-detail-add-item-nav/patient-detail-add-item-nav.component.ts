import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

// ToDo: bottomsheet in einem File

@Component({
  selector: 'app-patient-detail-add-item-nav',
  templateUrl: './patient-detail-add-item-nav.component.html',
  styleUrls: ['./patient-detail-add-item-nav.component.css']
})
export class PatientDetailAddItemNavComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<PatientDetailAddItemNavComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
