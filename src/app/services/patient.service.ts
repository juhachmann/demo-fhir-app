import { Injectable } from '@angular/core';

import { catchError, map, mergeMap, Observable } from 'rxjs';
import { FhirService } from './fhir.service';
import { PatientDTO } from '../models/patient-dto';
import { FhirMappingService } from './fhir-mapping.service';
import { log } from 'console';
import { ConditionDTO } from '../models/condition-dto';
import { ObservationDTO } from '../models/observation-dto';
import { PatientConditionCode } from '../models/patient-condition-code';
import { Bundle } from 'fhir/r4';
import { HttpResponse } from '@angular/common/http';

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
    console.log("id to search: " + id);
    return this.fhirService.getPatientById(id).pipe(
      map(patient => {
        if(!patient) return undefined;
        console.log(patient);
        return this.mapper.mapToPatientDTO(patient);
      })
    );
  }



  /**
   * 
   * @param id 
   * @returns 
   */
  public delete(patient: PatientDTO, conditions: ConditionDTO[], observations: ObservationDTO[]) : Observable<any> {
    let requests : {
      request : { method : "DELETE", url: string} 
    }[] = []
    conditions.forEach(cond => requests.push({request: {method: "DELETE", url: "Condition/" + cond.id}}))  
    observations.forEach(obs => requests.push({request: {method: "DELETE", url: "Observation/" + obs.id}}))  
    requests.push({request: {method: "DELETE", url: "Patient/" + patient.id}})  

    return this.fhirService.makeTransaction(requests);
  
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

