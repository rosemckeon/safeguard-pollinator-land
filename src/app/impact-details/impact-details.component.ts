import { Component, inject, Input } from '@angular/core';
import { Round } from '../round';
import { RoundService } from '../round.service';

@Component({
  selector: 'app-impact-details',
  standalone: true,
  imports: [],
  templateUrl: './impact-details.component.html',
  styleUrl: './impact-details.component.scss'
})
export class ImpactDetailsComponent {
  @Input() round!: Round;
  roundService: RoundService = inject(RoundService);
}
