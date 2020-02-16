import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {PatientsListService} from '../../../shared/patients-list.service';
import {Patient} from '../../../shared/patient.model';

@Component({
  selector: 'app-patents-list-table',
  templateUrl: './patents-list-table.component.html',
  styleUrls: ['./patents-list-table.component.css']
})
export class PatentsListTableComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['opDatum', 'name', 'geburtsdatum', 'state'];
  dataSource = new MatTableDataSource<Patient>();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  private patChangedSubscription: Subscription;

  constructor(private patientsListService: PatientsListService) {
  }

  ngOnInit() {
    this.patChangedSubscription = this.patientsListService.patientsChanged.subscribe(
      (patients: Patient[]) => {
        this.dataSource.data = patients;
      }
    );
    this.patientsListService.fetchAvailablePatients();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.patChangedSubscription.unsubscribe();
  }
}
