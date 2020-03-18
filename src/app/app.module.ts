import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './core/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {HomeComponent} from './home/home.component';
import {PatientsListComponent} from './patients/patients-list/patients-list.component';
import {PatientListItemComponent} from './patients/patients-list/patient-list-item/patient-list-item.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import de from '@angular/common/locales/de';
import {LoginComponent} from './core/auth/login/login.component';
import {PatientDetailsComponent} from './patients/patient-details/patient-details.component';
import {DeviceComponent} from './device/device.component';
import {StaffComponent} from './staff/staff.component';
import {PatientDetailAnamneseComponent} from './patients/patient-details/patient-detail-item/patient-detail-anamnese/patient-detail-anamnese.component';
import {PatientDetailFollowupComponent} from './patients/patient-details/patient-detail-item/patient-detail-followup/patient-detail-followup.component';
import {PatientDetailProcedureComponent} from './patients/patient-details/patient-detail-item/patient-detail-procedure/patient-detail-procedure.component';
import {PatientDetailOperationComponent} from './patients/patient-details/patient-detail-item/patient-detail-operation/patient-detail-operation.component';

import {environment} from '../environments/environment';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {PatentsListTableComponent} from './patients/patients-list/patents-list-table/patents-list-table.component';
import {PatientNewDialogComponent} from './patients/patient-new-dialog/patient-new-dialog.component';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {LineChartComponent} from './line-chart/line-chart.component';
import {ChartsModule} from 'ng2-charts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FlexLayoutModule, GridModule} from '@angular/flex-layout';
import {PatientDetailItemComponent} from './patients/patient-details/patient-detail-item/patient-detail-item.component';
import {PatientDetailAddItemNavComponent} from './patients/patient-details/patient-detail-add-item-nav/patient-detail-add-item-nav.component';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {NeueAnamneseComponent} from './patients/patient-details/patient-detail-item/patient-detail-anamnese/neue-anamnese/neue-anamnese.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {NeueOpComponent} from './patients/patient-details/patient-detail-item/patient-detail-operation/neue-op/neue-op.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {NeueProcedureComponent} from './patients/patient-details/patient-detail-item/patient-detail-procedure/neue-procedure/neue-procedure.component';
import {NeueVisiteComponent} from './patients/patient-details/patient-detail-item/patient-detail-followup/neue-visite/neue-visite.component';
import {AuthGuard} from './core/auth/auth.guard';
import {AuthService} from './core/auth/auth.service';
import {SignupComponent} from './core/auth/signup/signup.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFileMedicalAlt, faStethoscope, faSyringe, faTools} from '@fortawesome/free-solid-svg-icons';


registerLocaleData(de);


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    HomeComponent,
    PatientsListComponent,
    PatientListItemComponent,
    LoginComponent,
    PatientDetailsComponent,
    DeviceComponent,
    StaffComponent,
    PatientDetailAnamneseComponent,
    PatientDetailOperationComponent,
    PatientDetailFollowupComponent,
    PatientDetailProcedureComponent,
    PatentsListTableComponent,
    PatientNewDialogComponent,
    LineChartComponent,
    PatientDetailItemComponent,
    PatientDetailAddItemNavComponent,
    NeueAnamneseComponent,
    NeueOpComponent,
    NeueProcedureComponent,
    NeueVisiteComponent,
    SignupComponent
  ],
  providers: [
    AngularFireStorage,
    AuthGuard,
    AuthService,
    {provide: FirestoreSettingsToken, useValue: {}}, // https://github.com/angular/angularfire2/issues/1993
    {provide: LOCALE_ID, useValue: 'de-de'},
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: APP_BASE_HREF, useValue: '/'}],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatNativeDatetimeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, MatDialogModule, ReactiveFormsModule, MatRadioModule, MatNativeDateModule, AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule, ChartsModule, MatProgressSpinnerModule, GridModule,
    FlexLayoutModule, MatProgressBarModule, MatDatetimepickerModule, FontAwesomeModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [PatientNewDialogComponent, PatientDetailAddItemNavComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faFileMedicalAlt);
    library.addIcons(faTools);
    library.addIcons(faStethoscope);
    library.addIcons(faSyringe);
  }
}
