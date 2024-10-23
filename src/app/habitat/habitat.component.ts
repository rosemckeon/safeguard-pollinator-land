import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitat } from '../habitat';

@Component({
  selector: 'app-habitat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.scss'
})
export class HabitatComponent {
  @Input() habitat!: Habitat;
}
