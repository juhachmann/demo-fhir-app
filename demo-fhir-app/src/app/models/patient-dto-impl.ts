import { HumanGenders } from "./human-genders";
import { PatientDTO } from "./patient-dto";


export class PatientDTOImpl implements PatientDTO {
    id: string | undefined;
    familyName: string | undefined;
    givenNames: string | undefined;
    birthDate: Date | undefined;
    gender: HumanGenders | undefined;
    address: string | undefined;
    city: string | undefined;
    country: string | undefined;
    email: string | undefined;
    photo: string | undefined;
    // weight = { id: undefined, value: undefined };
    // height = { id: undefined, value: undefined };
    // illness = { id: undefined, value: undefined };
    active: boolean | undefined;
    // practitioner = { id: undefined, name: undefined };
}