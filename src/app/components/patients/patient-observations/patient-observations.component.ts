import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient-observations',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, DialogModule, ButtonModule, InputNumberModule, 
    ReactiveFormsModule, DropdownModule],
  templateUrl: './patient-observations.component.html',
  styleUrl: './patient-observations.component.css'
})

export class PatientObservationsComponent implements OnInit{

  constructor(
    private patientService : PatientService,
    private formBuilder: NonNullableFormBuilder,
    private messageService: MessageService,
  ) {}

  @Input({required: true}) patient : PatientDTO | undefined
  @Output() updateObservations = new EventEmitter<ObservationDTO[]>

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
      next: data => {
        this.observations = data
        this.updateObservations.emit(this.observations)
      },
      error: err => this.showLocalMessage("error", err)     
    });
  }

  public saveObservation() : void {
    let formValue = this.form.getRawValue();
    
    let observation : ObservationDTO = {
      id: undefined,
      code: formValue.code,
      value: formValue.value
    };
    
    this.patientService.saveObservation(this.patient!, observation).subscribe({
      next: data => {if(data) this.observations.push(data); this.showLocalMessage("success", "Observation added!")},
      error: err => this.showLocalMessage("error", err),
      complete: () => {
        this.formVisible = false
        this.form.reset()
      }
    });
  }

  public showLocalMessage(severity: 'success' | 'warn' | 'error', detail: string) : void {
    this.messageService.add({
      key: 'patient-details',
      severity: severity,
      detail: detail
    })
  }
  

}
