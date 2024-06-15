import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConditionsComponent } from './manage-conditions.component';

describe('ManageConditionsComponent', () => {
  let component: ManageConditionsComponent;
  let fixture: ComponentFixture<ManageConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
