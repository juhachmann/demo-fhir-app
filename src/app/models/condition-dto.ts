import { PatientConditionCode } from "./patient-condition-code";

export interface ConditionDTO {
    readonly id: string | undefined,
    code: PatientConditionCode | string | undefined,
}
