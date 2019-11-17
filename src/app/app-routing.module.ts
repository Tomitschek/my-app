import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {PatientenComponent} from './patienten/patienten.component';


const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'patienten', component : PatientenComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
