import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {PatientsListComponent} from './patients/patients-list/patients-list.component';
import {PatientDetailsComponent} from './patients/patient-details/patient-details.component';
import {DeviceComponent} from './device/device.component';
import {LoginComponent} from './core/auth/login/login.component';
import {NeueAnamneseComponent} from './patients/patient-details/patient-detail-item/patient-detail-anamnese/neue-anamnese/neue-anamnese.component';
import {NeueOpComponent} from './patients/patient-details/patient-detail-item/patient-detail-operation/neue-op/neue-op.component';
import {NeueProcedureComponent} from './patients/patient-details/patient-detail-item/patient-detail-procedure/neue-procedure/neue-procedure.component';
import {NeueVisiteComponent} from './patients/patient-details/patient-detail-item/patient-detail-followup/neue-visite/neue-visite.component';
import {AuthGuard} from './core/auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'patientslist', component: PatientsListComponent, canActivate: [AuthGuard]},
  {path: 'patientdetails/:id', component: PatientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'neueAnamnese/:id', component: NeueAnamneseComponent, canActivate: [AuthGuard]},
  {path: 'neueOp/:id', component: NeueOpComponent, canActivate: [AuthGuard]},
  {path: 'neueProcedur/:id', component: NeueProcedureComponent, canActivate: [AuthGuard]},
  {path: 'neueVisite/:id', component: NeueVisiteComponent, canActivate: [AuthGuard]},
  {path: 'devices', component: DeviceComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
