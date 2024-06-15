import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientDTO } from '../../../models/patient-dto';
import { ObservationDTO } from '../../../models/observation-dto';
import { PatientService } from '../../../services/patient.service';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { PatientObservationCode } from '../../../models/patient-observation-code';

@Component({
  selector: 'app-manage-observations',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, DialogModule, ButtonModule, InputNumberModule, 
    ReactiveFormsModule, DropdownModule],
  templateUrl: './manage-observations.component.html',
  styleUrl: './manage-observations.component.css'
})

export class ManageObservationsComponent implements OnInit{

  constructor(
    private patientService : PatientService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  @Input({required: true}) patient : PatientDTO | undefined

  observations : ObservationDTO[] = []
  formVisible : boolean = false

  codes : string[] = [
    PatientObservationCode.HEIGHT, PatientObservationCode.WEIGHT
  ]

  form = this.formBuilder.group({
    code: ['', Validators.required],
    value: [0, Validators.required]
  });

  ngOnInit(): void {
    this.getPatientObservations();
  }

  private getPatientObservations() : void {
    this.patientService.getPatientObservations(this.patient?.id!).subscribe({
      next: data => this.observations = data,
      error: err => console.log(err)      
    });
  }

  public saveObservation() : void {
    let formValue = this.form.getRawValue();
    
    let observation : ObservationDTO = {
      id: undefined,
      code: formValue.code,
      value: formValue.value
    };
    console.log(observation);
    
    this.patientService.saveObservation(this.patient!, observation).subscribe({
      next: data => {if(data) this.observations.push(data)},
      error: err => console.log(err)
    });
  }
  

}
