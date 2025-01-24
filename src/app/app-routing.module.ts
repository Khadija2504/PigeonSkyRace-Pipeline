import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m=> m.AuthModule)},
  {path: 'pigeon', loadChildren: () => import('./pigeon/pigeon.module').then(m => m.PigeonModule), canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'breeder' }},
  {path: 'error', loadChildren: () => import('./error/error.module').then(m=> m.ErrorModule)},
  {path: 'season', loadChildren: () => import('./season/season.module').then(m=> m.SeasonModule), canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'organizer' }},
  {path: 'competition', loadChildren: () => import('./competition/competition.module').then(m => m.CompetitionModule), canActivate: [AuthGuard, RoleGuard], data: {expectedRole: 'organizer'}},
  {path: 'results', loadChildren: () => import('./result/result.module').then(m => m.ResultModule)},
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
