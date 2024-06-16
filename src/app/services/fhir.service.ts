import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  Bundle,
  Condition,
  Observation,
  OperationOutcome,
  Patient,
  Resource
} from 'fhir/r4';

import { catchError, Observable, of, tap } from 'rxjs';
import config from '../../config.json';

interface TransactionEntry {
  fullUrl?: string,
  resource?: Resource,
  request: {
      method: string,
      url: string
  }
}

enum HttpMethods {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

@Injectable({
  providedIn: 'root',
})
export class FhirService {

  url = config.fhir.url;
  headers = new HttpHeaders()

  constructor (
    private http: HttpClient
  ) {
    if(!config.fhir.cache) {      
      this.headers = new HttpHeaders().set('Cache-Control', 'no-cache') 
    }
  }


    /**
   * 
   * @param Patient patient 
   * @returns Observable<Bundle<Condition> | undefined>
   */
    getConditionByPatientId(id: string) : Observable<Bundle<Condition> | undefined> {
      return this.http
        .get<Bundle<Condition>>(`${this.url}/Condition?subject=${id}`,
          {headers: this.headers}
        )
        //.pipe(catchError(this.fhir.handleError('getConditionByPatient', undefined)))
    }
  
   
    /**
     * 
     * @param Condition condition 
     * @returns Observable<Condition | undefined>
     */
    createCondition(condition: Condition): Observable<Condition | undefined> {
      return this.http
        .post<Condition>(`${this.url}/Condition`, condition)
        //.pipe(catchError(this.fhir.handleError('createCondition', undefined)))
    }
    
     
    /**
     * 
     * @param Condition condition 
     * @returns Observable<Condition | undefined>
     */
    updateCondition(condition: Condition) {
      return this.http
        .put<Condition>(`${this.url}/Condition/${condition.id!}`, condition)
        //.pipe(catchError(this.fhir.handleError('updateCondition', undefined)));
    }
    
    
    /**
     * 
     * @param string id 
     * @returns 
     */
    deleteCondition(id: string) {
      return this.http
        .delete<OperationOutcome>(`${this.url}/Condition/${id}`)
        //.pipe(catchError(this.fhir.handleError('deleteCondition', undefined)));
    }


      /**
   * 
   * @param Patient patient 
   * @returns Observable<Bundle<Observation> | undefined>
   */
  getObservationsByPatientId(id: string) : Observable<Bundle<Observation> | undefined> {
    return this.http
      .get<Bundle<Observation>>(`${this.url}/Observation?subject=${id}`,
        {headers: this.headers}
      )
      //.pipe(catchError(this.fhir.handleError('getObservationByPatient', undefined)));
  }


  // /**
  //  * Returns the last X Observations by Patient and Code
  //  * If no max param is passed, it will return only the last record
  //  *  
  //  * @param Patient patient
  //  * @param string Code 
  //  * @param number max number of last records to return
  //  * @returns Observable<Bundle<Observation> | undefined>
  //  */
  // // {{fhir}}/Observation?_sort=-_lastUpdated&_count=1&subject=6&code=Weight
  // getObservationByPatientAndCode(patient: Patient, code: string, max: number = 1) : Observable<Bundle<Observation> | undefined> {
  //   return this.http
  //     .get<Bundle<Observation>>(`${this.url}/Observation?_sort=-_lastUpdated&_count=${max}&subject=${patient.id}&code=${code}`)
  //     //.pipe(catchError(this.fhir.handleError('getObservationByPatient', undefined)));
  // }
  

  /**
   * 
   * @param Observation observation 
   * @returns Observable<Observation | undefined>
   */
  createObservation(observation: Observation): Observable<Observation | undefined> {
    return this.http
      .post<Observation>(`${this.url}/Observation`, observation)
      //.pipe(catchError(this.fhir.handleError('createObservation', undefined)));
  }
  
  
  /**
   * 
   * @param Observation observation 
   * @returns Observable<Observation | undefined>
   */
  updateObservation(observation: Observation) {
    return this.http
      .put<Observation>(`${this.url}/Observation/${observation.id!}`, observation)
      //.pipe(catchError(this.fhir.handleError('updateObservation', undefined)));
  }
  
  
  /**
   * 
   * @param string id 
   * @returns 
   */
  deleteObservation(id: string) {
    return this.http
      .delete<OperationOutcome>(`${this.url}/Observation/${id}`)
      //.pipe(catchError(this.fhir.handleError('deleteObservation', undefined)));
  }


    /**
   * 
   * @returns Observable<Bundle<Patient> | undefined>
   */
    getPatients() : Observable<Bundle<Patient> | undefined> {
      let url = `${this.url}/Patient?_count=99`;
      console.log(JSON.stringify(this.headers));
      
      return this.http
        .get<Bundle<Patient>>(url,
          {headers: this.headers}
        )
        //.pipe(catchError(this.fhir.handleError('getPatients', undefined)));
    }
  
  
    /**
     * 
     * @param string id 
     * @returns Observable<Patient | undefined> 
     */
    getPatientById(id: string): Observable<Patient | undefined> {
      console.log("From fhir service...");
      return this.http
        .get<Patient>(`${this.url}/Patient/${id}`,
          {headers: this.headers}
        ).pipe(tap(res => console.log("from tap" + JSON.stringify(res)))
        )
        //.pipe(catchError(this.fhir.handleError('getPatientById', undefined)));
    }
  
  
    /**
     * 
     * @param Patient patient 
     * @returns Observable<Patient | undefined>
     */
    createPatient(patient: Patient) : Observable<Patient | undefined> {
      return this.http
        .post<Patient>(`${this.url}/Patient`, patient,
          {headers: this.headers}
        )
        //.pipe(catchError(this.fhir.handleError('createPatient', undefined)));
    }
  
  
    /**
     * 
     * @param Patient patient 
     * @returns Observable<Patient | undefined>
     */
    updatePatient(patient: Patient) {
      return this.http
        .put<Patient>(`${this.url}/Patient/${patient.id!}`, patient)
        //.pipe(catchError(this.fhir.handleError('updatePatient', undefined)));
    }
  
  
    /**
     * 
     * @param string id 
     * @returns 
     */
    deletePatient(id: string) {
      return this.http
        .delete<OperationOutcome>(`${this.url}/Patient/${id}`)
        //.pipe(catchError(this.fhir.handleError('deletePatient', undefined)));
    }
  

      /**
   * 
   * @param transactionBody 
   * @returns 
   */
  public makeTransaction(requests : TransactionEntry[]) : Observable<Bundle<any> | undefined> {  
    
    console.log(JSON.stringify(requests[0]));

    
    let transaction  = {
      resourceType : "Bundle",
      id : "bundle-transaction",
      type : "transaction",
      entry : requests }
     
    console.log("Transaction: ");      
    console.log(JSON.stringify(transaction));
      
    return this.http
      .post<Bundle<any>>(`${this.url}`, transaction)
      //.pipe(catchError(this.error.handleError('transaction', undefined)));
  }

}

