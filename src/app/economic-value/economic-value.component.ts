import { Component, inject, Input } from '@angular/core';
import { Round } from '../round';
import { RoundService } from '../round.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-economic-value',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './economic-value.component.html',
  styleUrl: './economic-value.component.scss'
})
export class EconomicValueComponent {
  @Input() round!: Round;  
  roundService: RoundService = inject(RoundService);
}
