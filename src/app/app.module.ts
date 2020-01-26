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
import {
  MatBadgeModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PatientsListService} from './patients/patients-list/patients-list.service';
import de from '@angular/common/locales/de';
import {SignupComponent} from './core/auth/signup/signup.component';
import {LoginComponent} from './core/auth/login/login.component';
import {PatientDetailsComponent} from './patients/patient-details/patient-details.component';
import {ProcedureSessionComponent} from './patients/procedure-session/procedure-session.component';
import {AssesmentComponent} from './patients/assesment/assesment.component';
import {VisiteComponent} from './patients/visite/visite.component';
import {DeviceComponent} from './device/device.component';
import {StaffComponent} from './staff/staff.component';

registerLocaleData(de);


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    HomeComponent,
    PatientsListComponent,
    PatientListItemComponent,
    SignupComponent,
    LoginComponent,
    PatientDetailsComponent,
    ProcedureSessionComponent,
    AssesmentComponent,
    VisiteComponent,
    DeviceComponent,
    StaffComponent
  ],
  providers: [
    PatientsListService,
    {provide: LOCALE_ID, useValue: 'de-de'},
    {provide: APP_BASE_HREF, useValue: '/'}],
  imports: [
    BrowserModule, AppRoutingModule,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    FlexLayoutModule, MatCheckboxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
