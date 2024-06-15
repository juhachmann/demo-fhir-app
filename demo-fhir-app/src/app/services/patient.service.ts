import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { FhirService } from './fhir.service';
import { PatientDTO } from '../models/patient-dto';
import { FhirMappingService } from './fhir-mapping.service';
import { log } from 'console';
import { ConditionDTO } from '../models/condition-dto';
import { ObservationDTO } from '../models/observation-dto';
import { PatientConditionCode } from '../models/patient-condition-code';

@Injectable({
  providedIn: 'root',
})

export class PatientService {

 
  constructor(
    private fhirService : FhirService, 
    private mapper: FhirMappingService
  ) {}


  /**
   * @param patient 
   * @returns 
   */
  public save(patient: PatientDTO) : Observable<PatientDTO | undefined>{
    console.log(patient);
    
      const fhirPatient = this.mapper.mapToFhirPatient(patient)
      console.log(fhirPatient);
      
      const operation = patient.id ? 
        this.fhirService.updatePatient(fhirPatient) : this.fhirService.createPatient(fhirPatient); 
      return operation.pipe(
        map(patient => {
          return patient ?
            this.mapper.mapToPatientDTO(patient) : undefined
        }));
  }


  /**
   * 
   * @returns 
   */
  public getPatients() : Observable<PatientDTO[]>  {
    return this.fhirService.getPatients().pipe(
      map((bundle) => {
          const dtos : PatientDTO[] = []
          bundle?.entry?.forEach((patientEntry) => {
            if(patientEntry.resource) 
              dtos.push(this.mapper.mapToPatientDTO(patientEntry.resource))
          })
          return dtos;
      }));
  }


  public getPatientById(id: string): Observable<PatientDTO | undefined> {
    return this.fhirService.getPatientById(id).pipe(
      map(patient => {
        if(!patient) return undefined;
        return this.mapper.mapToPatientDTO(patient);
      })
    );
  }



  /**
   * 
   * @param id 
   * @returns 
   */
  public delete(id: string) : Observable<string[]>{
    return this.fhirService.deletePatient(id).pipe(
      map(outcome => {
        let issues : string[] = []
        outcome.issue.forEach(issue => {
            if(issue.details?.text) 
              issues.push(issue.details.text)
        });
        return issues;
      })
    );
  }


  private handleCascadeOnDeleteForPatient() {
    // let requests : { request : { method : string, url: string} }[] = []
  
    // this.observationService.getObservationsByPatient(patient).subscribe((observations) => {
    //   if(observations?.entry) {
    //     observations.entry!.forEach((entry) => {
    //       requests.push({
    //         request : {
    //           method : "DELETE",
    //           url : "Observation/" + entry!.resource!.id
    //         }
    //       })
    //     })
    //   }

    //   this.conditionService.getConditionByPatient(patient).subscribe((conditions) => {
    //     if(conditions?.entry) {
    //       conditions.entry!.forEach((entry) => {
    //         requests.push({
    //           request : {
    //             method : "DELETE",
    //             url : "Condition/" + entry!.resource!.id
    //           }
    //         })
    //       })
    //     }

    //     requests.push({
    //       request : {
    //         method : "DELETE",
    //         url : "Patient/" + patient.id
    //       }
    //     })
        
    //     this.fhirService.makeTransaction(requests).subscribe((response) => {
    //       if(!response) {
    //         this.showToastMessage('Sorry, patient could not be deleted from the database!', 'warn')
    //         return
    //       }
    //       this.showToastMessage('Patient was deleted from the database', 'success')
    //       this.getPatients();
    //     })
    //   })
    // })
  }


  public getPatientConditions(id: string): Observable<ConditionDTO[]> {
    return this.fhirService.getConditionByPatientId(id).pipe(
      map(bundle => {
        const dtos: ConditionDTO[] = [];
        bundle?.entry?.forEach((condEntry) => {
          if (condEntry.resource)
            dtos.push(this.mapper.mapToConditionDTO(condEntry.resource));
        });
        return dtos;
      })
    );
  }


  saveCondition(patient: PatientDTO, conditionDTO: ConditionDTO) : Observable<ConditionDTO | undefined> {
    let condition = this.mapper.mapToFhirCondition(patient, conditionDTO);
    return this.fhirService.createCondition(condition).pipe(
      map(cond => {
        if(cond) return this.mapper.mapToConditionDTO(cond)
        else return undefined
      })
    );
  }


  public getPatientObservations(id: string): Observable<ObservationDTO[]> {
    return this.fhirService.getObservationsByPatientId(id).pipe(
      map(bundle => {
        const dtos: ObservationDTO[] = [];
        bundle?.entry?.forEach((condEntry) => {
          if (condEntry.resource)
            dtos.push(this.mapper.mapToObservationDTO(condEntry.resource));
        });
        return dtos;
      })
    );
  }


  public saveObservation(patientDTO: PatientDTO, observationDTO: ObservationDTO): Observable<ObservationDTO | undefined> {
    let observation = this.mapper.mapToFhirObservation(patientDTO, observationDTO);
    return this.fhirService.createObservation(observation).pipe(
      map(obs => {
        if(obs) return this.mapper.mapToObservationDTO(obs)
        else return undefined
      })
    );
  }

}

