import {Component, Input, OnInit} from '@angular/core';
import {TimelineElement} from '../../../shared/models/timeline-element.model';

@Component({
  selector: 'app-patient-detail-item',
  templateUrl: './patient-detail-item.component.html',
  styleUrls: ['./patient-detail-item.component.css']
})
export class PatientDetailItemComponent implements OnInit {
  @Input() timelineElement: TimelineElement;

  constructor() {
  }

  ngOnInit(): void {
  }

}
