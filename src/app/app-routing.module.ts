import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {PatientsListComponent} from './patients/patients-list/patients-list.component';
import {SignupComponent} from './core/auth/signup/signup.component';
import {LoginComponent} from './core/auth/login/login.component';
import {PatientDetailsComponent} from './patients/patient-details/patient-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'patientslist', component: PatientsListComponent},
  {path: 'patientdetails/:id', component: PatientDetailsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
