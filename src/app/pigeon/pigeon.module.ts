import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PigeonRoutingModule } from './pigeon-routing.module';
import { PigeonComponent } from './pigeon.component';
import { PigeonFormComponent } from './pigeon-form/pigeon-form.component';
import { PigeonListComponent } from './pigeon-list/pigeon-list.component';


@NgModule({
  declarations: [
    PigeonComponent,
    PigeonFormComponent,
    PigeonListComponent
  ],
  imports: [
    CommonModule,
    PigeonRoutingModule,
    ReactiveFormsModule
  ]
})
export class PigeonModule { }
