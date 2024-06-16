import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConditionsComponent } from './patient-conditions.component';

describe('ManageConditionsComponent', () => {
  let component: PatientConditionsComponent;
  let fixture: ComponentFixture<PatientConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
