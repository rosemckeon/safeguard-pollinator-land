import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundImpact } from '../round-impact';

@Component({
  selector: 'app-round-impacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-impacts.component.html',
  styleUrl: './round-impacts.component.scss'
})
export class RoundImpactsComponent {
  @Input() roundImpact!: RoundImpact;

  constructor(){}

}
