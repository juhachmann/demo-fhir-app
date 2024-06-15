import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageObservationsComponent } from './manage-observations.component';

describe('ManageObservationsComponent', () => {
  let component: ManageObservationsComponent;
  let fixture: ComponentFixture<ManageObservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageObservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
