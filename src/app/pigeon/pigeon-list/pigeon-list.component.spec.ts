import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonListComponent } from './pigeon-list.component';

describe('PigeonListComponent', () => {
  let component: PigeonListComponent;
  let fixture: ComponentFixture<PigeonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigeonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigeonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
