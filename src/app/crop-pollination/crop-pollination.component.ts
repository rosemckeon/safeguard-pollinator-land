import { Component, inject, Input } from '@angular/core';
import { Round } from '../round';
import { RoundService } from '../round.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crop-pollination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crop-pollination.component.html',
  styleUrl: './crop-pollination.component.scss'
})
export class CropPollinationComponent {
  @Input() round!: Round;  
  roundService: RoundService = inject(RoundService);
}
