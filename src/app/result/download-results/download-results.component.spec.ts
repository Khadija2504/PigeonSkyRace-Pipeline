import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadResultsComponent } from './download-results.component';

describe('DownloadResultsComponent', () => {
  let component: DownloadResultsComponent;
  let fixture: ComponentFixture<DownloadResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
