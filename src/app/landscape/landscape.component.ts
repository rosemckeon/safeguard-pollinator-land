import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatComponent } from '../habitat/habitat.component'
import { HabitatService } from '../habitat.service';

@Component({
  selector: 'app-landscape',
  standalone: true,
  imports: [CommonModule, HabitatComponent],
  templateUrl: './landscape.component.html',
  styleUrl: './landscape.component.scss'
})
export class LandscapeComponent {
  habitatService: HabitatService = inject(HabitatService);
  constructor() {}
}
