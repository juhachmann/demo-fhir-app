import { Routes } from '@angular/router';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { ManagePatientsComponent } from './components/patients/manage-patients/manage-patients.component';
import { PatientDetailsComponent } from './components/patients/patient-details/patient-details.component';
import { OtherResourcesComponent } from './components/other-resources/other-resources.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'patients/:id', component: PatientDetailsComponent},
    {path: 'patients', component: ManagePatientsComponent},
    {path: 'other', component: OtherResourcesComponent}
];
