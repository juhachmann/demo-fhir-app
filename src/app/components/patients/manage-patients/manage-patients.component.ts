
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleCasePipe, LowerCasePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

import { PatientService } from '../../../services/patient.service';

import { ConfirmationService, FilterService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { PatientDTO } from '../../../models/patient-dto';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MockService } from '../../../services/mock.service';

interface Column {
  field: string,
  header: string
}


@Component({
  standalone: true,
  selector: 'app-manage-patients',
  templateUrl: './manage-patients.component.html',
  styleUrls: ['./manage-patients.component.css'],
  providers: [
    ConfirmationService, FilterService, DialogService, DynamicDialogRef
  ],
  imports: [CommonModule, DividerModule, TableModule, ToastModule, ConfirmDialogModule, TagModule,
    TitleCasePipe, LowerCasePipe, RouterLink, IconFieldModule, InputTextModule, InputIconModule
  ]
})

export class ManagePatientsComponent implements OnInit, OnDestroy {

  constructor ( 
    private router: Router,
    private confirmationService : ConfirmationService,
    private messageService : MessageService,
    private dialogService : DialogService,  
    private patientService : PatientService,
    private mockService : MockService,
  ) {}

  ref : DynamicDialogRef | undefined = undefined;
  sortingColumn : string | undefined;

  patients : PatientDTO[] = [];

  subscriptions: Subscription[] = []
  
  /**
   * On Init:
   * - patient's table data must not be sorted
   * - fetches Patients
  */
  ngOnInit(): void {
    this.sortingColumn = undefined;
    this.getPatients();
  }

  /**
   * On Destroy:
   * - unsubscribes from all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }


  /**
   * Retrieves All Patients from Fhir Database
   */
  private getPatients() : void {
    let subscription = this.patientService.getPatients().subscribe({
      next: dtos => this.patients = dtos,
      error: err => console.log(err)
    });
    this.subscriptions.push(subscription);
  }



  // TODO Ajustar aqui o update de um paciente se foi atualizado aqui de dentro!
  /**
   * Shows Patient Details
   * using DialogService (PrimeNg Modal)   * 
   * @param patient 
   */
  showPatientDetails(patient : PatientDTO) {
    this.router.navigate(['/patients/' + patient.id]);
  }



  /**
   * Shows Create or Edit Patient Form
   * using a primeNg modal
   * When closing the modal, shows a feedback message
   * 
   * @param type Action to be triggered ('create' or 'edit')
   * @param patient If editing, needs to pass the patient as an argument
   */
  createPatient() {
    this.ref = this.dialogService.open(
      CreatePatientComponent,
      {
        header: "Add Patient",
        width: window.innerWidth > 991 ? '50%' : '80%', // Make it responsive
        height: '100%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        resizable: true,
        draggable: true,
      });

    let subscription = this.ref.onClose.subscribe((patient: PatientDTO) => {
      if (patient) {
        this.getPatients();                  
      }
    });
    this.subscriptions.push(subscription);

  }

  genMockData() : void {
    this.mockService.saveMockPatients();
    this.getPatients();
  }

}
