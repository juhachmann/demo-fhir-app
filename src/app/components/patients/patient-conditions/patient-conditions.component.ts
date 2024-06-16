import { Component, Input, OnDestroy, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';
import { PatientDTO } from '../../../models/patient-dto';
import { PatientService } from '../../../services/patient.service';
import { ConditionDTO } from '../../../models/condition-dto';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { PatientConditionCode } from '../../../models/patient-condition-code';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-patient-conditions',
  standalone: true,
  imports: [CommonModule, DropdownModule, ChipModule, TitleCasePipe, DialogModule, ButtonModule ],
  templateUrl: './patient-conditions.component.html',
  styleUrl: './patient-conditions.component.css'
})
export class PatientConditionsComponent implements OnInit, OnDestroy {

  constructor(
    private patientService : PatientService,
    private messageService: MessageService,
  ) {}

  @Input({required: true}) patient! : PatientDTO;
  @Output() updateConditions = new EventEmitter<ConditionDTO[]>()

  conditions : ConditionDTO[] = []

  codes : string[] = [
    PatientConditionCode.DIABETES,
  ]

  formVisible : boolean = false;

  subscriptions : Subscription[] = []

  ngOnInit(): void {
    this.getPatientConditions()    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  private getPatientConditions() : void {
    let subscription = this.patientService.getPatientConditions(this.patient?.id!).subscribe({
      next: data => {
        this.conditions = data
        this.updateConditions.emit(this.conditions)
      },
      error: err => this.showLocalMessage("error", err)
    });
    this.subscriptions.push(subscription);
  }


  saveCondition(code: any) : void {
    let condition : ConditionDTO = {
      code: code,
      id: undefined
    };
    let subscription = this.patientService.saveCondition(this.patient, condition).subscribe({
      next: (cond) => {if(cond) this.conditions.push(cond), this.showLocalMessage("success", "Condition added!")},
      error: err => {this.showLocalMessage("error", err)},
      complete: () => {
        this.formVisible = false

      }  
    });
    
    this.subscriptions.push(subscription)
  }    


  public showLocalMessage(severity: 'success' | 'warn' | 'error', detail: string) : void {
    this.messageService.add({
      key: 'patient-details',
      severity: severity,
      detail: detail
    })
  }


}
