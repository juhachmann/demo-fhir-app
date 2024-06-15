import { Patient } from "fhir/r4";
import { HumanGenders } from "./human-genders";


export interface PatientDTO {
    
    id: string | undefined;
    familyName: string | undefined;
    givenNames: string | undefined;
    birthDate: Date | undefined;
    gender: 'other' | 'male' | 'female' | 'unknown' | undefined;
    address: string | undefined;
    city: string | undefined;
    country: string | undefined;
    email: string | undefined;
    photo: string | undefined;
    // weight: {id: string | undefined, value: number | undefined};
    // height: {id: string | undefined, value: number | undefined};
    // illness: {id: string | undefined, value: string | undefined};
    active: boolean | undefined;
    // practitioner: {
    //     id: string  | undefined,
    //     name: string | undefined
    // }
    
}
