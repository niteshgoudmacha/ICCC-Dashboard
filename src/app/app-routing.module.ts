import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'profile/:handle', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
