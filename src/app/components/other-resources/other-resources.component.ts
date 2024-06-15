import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-other-resources',
  standalone: true,
  imports: [],
  templateUrl: './other-resources.component.html',
  styleUrl: './other-resources.component.css'
})
export class OtherResourcesComponent {

  @Input() id : string = ''

}
