import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientObservationsComponent } from './patient-observations.component';

describe('ManageObservationsComponent', () => {
  let component: PatientObservationsComponent;
  let fixture: ComponentFixture<PatientObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientObservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
