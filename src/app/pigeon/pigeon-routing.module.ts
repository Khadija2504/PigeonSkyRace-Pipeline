import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PigeonFormComponent } from './pigeon-form/pigeon-form.component';

import { PigeonListComponent } from './pigeon-list/pigeon-list.component';

const routes: Routes = [
  {path: 'addPigeon', component: PigeonFormComponent},
  {path: 'pigeonsList', component: PigeonListComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PigeonRoutingModule { }
