import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';

import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get patients',
    inject([HttpTestingController, PatientService],
      (httpMock: HttpTestingController, service : PatientService) => {
        service.getPatients().subscribe(() => {
          
          
        })
      }
    )
   )

});
