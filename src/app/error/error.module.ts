import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    ErrorComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
