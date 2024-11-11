import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitat } from '../habitat';
import { HabitatResponseComponent } from '../habitat-response/habitat-response.component';
import { HabitatResponseService } from '../habitat-response.service';

@Component({
  selector: 'app-habitat',
  standalone: true,
  imports: [CommonModule, HabitatResponseComponent],
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.scss'
})
export class HabitatComponent {
  habitatResponseService: HabitatResponseService = inject(HabitatResponseService);
  @Input() habitat!: Habitat;

  constructor(){}
}
