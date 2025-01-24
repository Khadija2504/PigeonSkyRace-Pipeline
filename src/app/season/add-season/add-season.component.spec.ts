import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeasonComponent } from './add-season.component';

describe('AddSeasonComponent', () => {
  let component: AddSeasonComponent;
  let fixture: ComponentFixture<AddSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSeasonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
