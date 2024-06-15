import { Component, Input, OnDestroy, OnInit, NgModule } from '@angular/core';
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


@Component({
  selector: 'app-manage-conditions',
  standalone: true,
  imports: [CommonModule, DropdownModule, ChipModule, TitleCasePipe, DialogModule, ButtonModule ],
  templateUrl: './manage-conditions.component.html',
  styleUrl: './manage-conditions.component.css'
})
export class ManageConditionsComponent implements OnInit, OnDestroy {

  constructor(
    private patientService : PatientService
  ) {}

  @Input({required: true}) patient! : PatientDTO;

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
      next: data => this.conditions = data,
      error: err => console.log(err)
    });
    this.subscriptions.push(subscription);
  }


  saveCondition(code: string) : void {
    let condition : ConditionDTO = {
      code: code,
      id: undefined
    };
    console.log(condition)
    let subscription = this.patientService.saveCondition(this.patient, condition).subscribe({
      next: (cond) => {if(cond) this.conditions.push(cond)},
      error: err => {},
      complete: () => {this.formVisible = false}  
    });
    this.subscriptions.push(subscription)
  }    


}
