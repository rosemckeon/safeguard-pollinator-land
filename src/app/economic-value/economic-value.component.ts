import { Component, inject, Input } from '@angular/core';
import { Round } from '../round';
import { RoundService } from '../round.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-economic-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './economic-value.component.html',
  styleUrl: './economic-value.component.scss'
})
export class EconomicValueComponent {
  @Input() round!: Round;  
  roundService: RoundService = inject(RoundService);
}
