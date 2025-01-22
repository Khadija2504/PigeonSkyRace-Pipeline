import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadArrivalDataComponent } from './upload-arrival-data.component';

describe('UploadArrivalDataComponent', () => {
  let component: UploadArrivalDataComponent;
  let fixture: ComponentFixture<UploadArrivalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadArrivalDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadArrivalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
