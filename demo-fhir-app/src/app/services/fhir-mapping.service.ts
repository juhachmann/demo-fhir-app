import { Injectable } from '@angular/core';
import { PatientDTO } from '../models/patient-dto';
import { Condition, Observation, Patient } from 'fhir/r4';
import { ObservationDTO } from '../models/observation-dto';
import { ConditionDTO } from '../models/condition-dto';

@Injectable({
  providedIn: 'root'
})
export class FhirMappingService {

  constructor() { }

  public mapToFhirPatient(patient: PatientDTO) : Patient {
    return {
      resourceType: 'Patient',
      id: patient.id,
      name: [{
            given: patient.givenNames?.split(" "),
            family: patient.familyName
          }],
      telecom: [{
          system: 'email',
          value: patient.email
        }
      ],
      gender:  patient.gender,
      active: patient.active,
      birthDate: patient.birthDate?.toISOString(),
      address: [{
        text: patient.address,
        city: patient.city,
        country: patient.country
      }],
      photo: [{
        url: patient.photo
      }]
    }
  }

  public mapToPatientDTO(patient: Patient) : PatientDTO {
    return {
      id: patient.id,
      familyName: patient.name?.[0]?.family,
      givenNames: patient.name?.[0]?.given?.join(" "),
      birthDate: patient.birthDate ? new Date(patient.birthDate) : undefined,
      gender: patient.gender,
      address: patient.address?.[0]?.text,
      city: patient.address?.[0]?.city,
      country: patient.address?.[0]?.country,
      email: patient.telecom?.[0]?.system == 'email' ? patient.telecom?.[0].value : undefined,
      active: patient.active,
      photo: patient.photo?.[0]?.url
    }
  }

  public mapToFhirObservation (patient : PatientDTO, observation: ObservationDTO) : Observation {
    return {
      resourceType: 'Observation',
      id: observation.id, // AQUI PODE ESTAR UNDEFINED, VAMOS VER SE CRIA CORRETO O JSON!
      subject: { reference: 'Patient/' + patient.id },
      code: { coding: [{ code:  observation.code}] },
      valueQuantity: { value: observation.value },
      status: 'registered' 
    }
  }

  public mapToObservationDTO(observation: Observation): ObservationDTO {
    return {
      id: observation.id,
      code: observation.code?.coding?.[0]?.code,
      value: observation.valueQuantity?.value
    };
  }

  public mapToFhirCondition (patient : PatientDTO, condition: ConditionDTO) : Condition {
    return {
      resourceType: 'Condition',
      id: condition.id, // AQUI PODE ESTAR UNDEFINED, VAMOS VER SE CRIA CORRETO O JSON!
      subject: { reference: 'Patient/' + patient.id },
      code: { coding: [{ code:  condition.code }] }
    }
  }

  public mapToConditionDTO(condition: Condition): ConditionDTO {
    return {
      id: condition.id,
      code: condition.code?.coding?.[0].code
    };
  }


}
