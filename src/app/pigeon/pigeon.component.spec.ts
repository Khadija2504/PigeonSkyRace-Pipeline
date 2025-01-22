import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonComponent } from './pigeon.component';

describe('PigeonComponent', () => {
  let component: PigeonComponent;
  let fixture: ComponentFixture<PigeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigeonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
