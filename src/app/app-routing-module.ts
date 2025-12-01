import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authentication } from './components/authentication/authentication';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Peoples } from './components/peoples/peoples';

const routes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'authentication', component: Authentication },
  { path: 'dashboard/:sessionId', component: Dashboard, canActivate: [authGuard] },
  { path: "peoples/:sessionId", component: Peoples, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
