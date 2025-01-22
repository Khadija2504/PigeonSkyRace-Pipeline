import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonComponent } from './season.component';
import { AddSeasonComponent } from './add-season/add-season.component';

const routes: Routes = [
  {path: 'addSeason', component: AddSeasonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonRoutingModule { }
