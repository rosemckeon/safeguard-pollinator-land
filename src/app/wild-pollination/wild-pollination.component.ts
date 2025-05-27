import { Component, inject, Input } from '@angular/core';
import { Round } from '../round';
import { RoundService } from '../round.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-wild-pollination',
  standalone: true,
  imports: [
    CommonModule, 
    MatTooltipModule
  ],
  templateUrl: './wild-pollination.component.html',
  styleUrl: './wild-pollination.component.scss'
})
export class WildPollinationComponent {
  @Input() round!: Round;  
  roundService: RoundService = inject(RoundService);
}
