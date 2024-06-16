import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManagePatientsComponent } from './patients/manage-patients/manage-patients.component';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MessageService],
  imports: [RouterOutlet, CommonModule, RippleModule, ManagePatientsComponent, ToastModule, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(
    private messageService: MessageService,
  ) {}

  title = 'fhir-api';


  menuItems = [
    {label: 'Home', route: '', icon: ''},
    {label: 'Patients', route: '/patients', icon: ''},
    {label: 'Other Resources', route: '/other', icon: ''},
  ]

}
