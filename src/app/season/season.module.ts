import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SeasonRoutingModule } from './season-routing.module';
import { SeasonComponent } from './season.component';
import { AddSeasonComponent } from './add-season/add-season.component';


@NgModule({
  declarations: [
    SeasonComponent,
    AddSeasonComponent
  ],
  imports: [
    CommonModule,
    SeasonRoutingModule,
    ReactiveFormsModule
  ]
})
export class SeasonModule { }
