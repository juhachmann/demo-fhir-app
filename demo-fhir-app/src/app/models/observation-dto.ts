import { PatientObservationCode } from "./patient-observation-code";

export interface ObservationDTO {
    readonly id: string | undefined,
    code: string | undefined,
    value: number | undefined
}
