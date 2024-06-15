import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientDTO } from '../../../models/patient-dto';
import { PatientDTOImpl } from '../../../models/patient-dto-impl';
import { HumanGenders } from '../../../models/human-genders';

@Component({
  standalone: true,
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css'],
  imports: [CommonModule,
    ReactiveFormsModule, CalendarModule, RadioButtonModule, InputTextModule,
    DropdownModule, ProgressSpinnerModule, ToastModule]
})


export class CreatePatientComponent {

  constructor(
    private formBuilder : NonNullableFormBuilder,
    private messageService : MessageService,
    private dynamicDialogConfig : DynamicDialogConfig,
    private ref : DynamicDialogRef,
    private patientService : PatientService
  ) { }

  genderOptions : HumanGenders[] = [
    HumanGenders.FEMALE, HumanGenders.MALE, HumanGenders.OTHER, HumanGenders.UNKNOWN
  ]

  processingForm : boolean = false;

  update : boolean = this.dynamicDialogConfig.data?.patient ? true : false

  patient : PatientDTO = this.dynamicDialogConfig.data?.patient ?? new PatientDTOImpl()

  form = this.formBuilder.group({      
    familyName: [this.patient.familyName, Validators.required],
    givenNames: [this.patient.givenNames, Validators.required],
    birthDate: [this.patient.birthDate ? new Date(this.patient.birthDate!) : undefined, Validators.required],
    gender: [this.patient.gender, Validators.required],
    address: [this.patient.address],
    city: [this.patient.city],
    country: [this.patient.country],
    email: [this.patient.email, [Validators.required, Validators.email]],
  });   


  onSubmit() { 
    this.processingForm = true;

    this.updatePatientFromInputForm();

    this.patientService.save(this.patient).subscribe({
      next: (savedPatient) => {
        if(savedPatient) this.patient = savedPatient;
      },
      error: err => {
        console.log(err);
        this.showLocalErrorMessage("Unable to save patient. <br> Please, try again!"); 
      },
      complete: () => {
        this.processingForm = false;
        this.showGlobalSuccessMessage();
        this.ref.close(this.patient);
      }
    });
  }

  /**
   * Updates the patient object with input data from the form controls
   */
  private updatePatientFromInputForm() : void {

    const formValue = this.form.getRawValue();

    this.patient.familyName = formValue.familyName;
    this.patient.givenNames = formValue.givenNames;
    this.patient.birthDate = formValue.birthDate;
    this.patient.gender = formValue.gender;
    this.patient.address = formValue.address;
    this.patient.city = formValue.city; 
    this.patient.country = formValue.country; 
    this.patient.email = formValue.email; 
  }

  /**
   * 
   * @param message to be shown in the toast modal 
   */
  private showLocalErrorMessage( message: string ) : void {
    this.messageService.add({
      key: 'error_message', 
      severity: 'error', 
      sticky: true,
      detail: message
    });
  }


  /**
 * 
 * @param message to be shown in the toast modal 
 */
  private showGlobalSuccessMessage() : void {
    this.processingForm = false;
    this.messageService.add({
      key: 'mainApp', 
      severity: 'success', 
      detail: 'Patient ' + this.update ? 'updated!' : 'created!',
    });
  }


}
