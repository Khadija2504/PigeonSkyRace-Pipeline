import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { DisplayResultsComponent } from './display-results/display-results.component';
import { DownloadResultsComponent } from './download-results/download-results.component';
import { UploadArrivalDataComponent } from './upload-arrival-data/upload-arrival-data.component';


@NgModule({
  declarations: [
    ResultComponent,
    DisplayResultsComponent,
    UploadArrivalDataComponent,
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    DownloadResultsComponent
  ]
})
export class ResultModule { }
