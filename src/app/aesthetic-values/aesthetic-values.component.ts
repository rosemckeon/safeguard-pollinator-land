import { Component, inject, Input } from '@angular/core';
import { Round } from '../round';
import { RoundService } from '../round.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-aesthetic-values',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './aesthetic-values.component.html',
  styleUrl: './aesthetic-values.component.scss'
})
export class AestheticValuesComponent {
  @Input() round!: Round;  
  roundService: RoundService = inject(RoundService);
}
