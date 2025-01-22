import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispalyCompetitionsComponent } from './dispaly-competitions.component';

describe('DispalyCompetitionsComponent', () => {
  let component: DispalyCompetitionsComponent;
  let fixture: ComponentFixture<DispalyCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DispalyCompetitionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispalyCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
