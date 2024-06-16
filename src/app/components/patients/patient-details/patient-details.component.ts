import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { PatientDTO } from '../../../models/patient-dto';
import { PatientConditionsComponent } from '../patient-conditions/patient-conditions.component';
import { PatientObservationsComponent } from '../patient-observations/patient-observations.component';
import { Subscription } from 'rxjs';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PatientService } from '../../../services/patient.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { ConditionDTO } from '../../../models/condition-dto';
import { ObservationDTO } from '../../../models/observation-dto';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
  imports: [ConfirmDialogModule, DatePipe, ToastModule, ButtonModule, ChipModule, 
    DividerModule, TitleCasePipe, CommonModule, PatientConditionsComponent, 
    PatientObservationsComponent],
  providers: [ConfirmationService, DialogService]
})

export class PatientDetailsComponent implements OnInit, OnDestroy{

  constructor (
    private confirmationService : ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private patientService : PatientService,
    private location: Location
  ) {}

  @Input() id : string = ''

  subscriptions : Subscription[] = []

  ref: DynamicDialogRef | undefined = undefined

  patient : PatientDTO | undefined;
  conditions: ConditionDTO [] | undefined;
  observations: ObservationDTO[] | undefined;

  

  ngOnInit(): void {
    this.getPatient();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
    console.log("Object Destroyed!");
    this.subscriptions.forEach(sub => console.log(sub.closed))
  }

  back() : void {
    this.location.back()
  }

  /**
   * https://codedec.com/tutorials/how-to-calculate-age-by-date-of-birth-in-javascript/ 
   * @param patient 
   * @returns 
   */
  public getAge(patient: PatientDTO) : number | undefined {
    if(!patient.birthDate) return undefined;
    let month_diff = Date.now() - patient.birthDate.getTime();
    let ageDateTime = new Date(month_diff); 
    let year = ageDateTime.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return age;
  }


  public updatePatient() {
    this.ref = this.dialogService.open(
      CreatePatientComponent,
      {
        header: "Edit Patient",
        width: window.innerWidth > 991 ? '50%' : '80%', // Make it responsive
        height: '100%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        resizable: true,
        draggable: true,
        data: {
          patient: this.patient
        }
      });

    let subscription = this.ref.onClose.subscribe((patient: PatientDTO) => {
      if (patient) {
        this.patient = patient;                  
      }
    });
    this.subscriptions.push(subscription);

  }

  public updateConditions(cond: ConditionDTO[]) {
    this.conditions = cond
  }

  public updateObservations(obs: ObservationDTO[]) {
    this.observations = obs
  }

  private getPatient() : void {
    let subscription = this.patientService.getPatientById(this.id).subscribe({
      next: (response) => {console.log(response);
       if(response) this.patient = response},
      error: err => this.showLocalMessage("error", err)
    });
    this.subscriptions.push(subscription);
  }



  /**
   * Handle the event triggered by Delete Patient Button
   * using a modal by primeNg
   * @param event 
   * @param patient 
   */
  confirmDelete() { 
    this.confirmationService.confirm({
      //target: event.target!,
      message: `Delete patient ${this.patient?.givenNames} ${this.patient?.familyName}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePatientAndRedirect()
      }
    });
  }
      
      
  private deletePatientAndRedirect() {
    let subscription = this.patientService.delete(this.patient!, this.conditions!, this.observations!)
    .subscribe({
      error: err => {
        console.log(err);
        this.showLocalMessage("error", "Not able to delete this patient")
      },
      complete: () => {
        this.showGlobalMessage();
        this.location.back()
      }
    });
    this.subscriptions.push(subscription);
  }


  private showGlobalMessage() : void {
    this.messageService.add({
      key: 'mainApp',
      severity: 'warn',
      detail: 'Patient deleted!'
    })
  }


  private showLocalMessage(severity: 'success' | 'warn' | 'error', detail: string) : void {
    this.messageService.add({
      key: 'patient-details',
      severity: severity,
      detail: detail
  })


  }


}
