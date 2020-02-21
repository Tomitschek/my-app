import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Patient} from '../../../shared/patient.model';
import {PatientService} from '../../../shared/patient.service';

@Component({
  selector: 'app-patents-list-table',
  templateUrl: './patents-list-table.component.html',
  styleUrls: ['./patents-list-table.component.css']
})
export class PatentsListTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['opDatum', 'name', 'geburtsdatum', 'state'];
  dataSource = new MatTableDataSource<Patient>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subs: Subscription[] = [];

  constructor(private fs: PatientService) {
  }

  ngOnInit() {

    this.subs.push(this.fs.getPatients().subscribe(
      (patients: Patient[]) => {
        this.dataSource.data = patients;
      }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
