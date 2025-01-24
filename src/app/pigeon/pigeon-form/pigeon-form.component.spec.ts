import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigeonFormComponent } from './pigeon-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PigeonFormComponent', () => {
  let component: PigeonFormComponent;
  let fixture: ComponentFixture<PigeonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PigeonFormComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigeonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
