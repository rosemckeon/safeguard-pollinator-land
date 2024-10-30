import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Round } from '../round';

@Component({
  selector: 'app-round-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './round-details.component.html',
  styleUrl: './round-details.component.scss'
})
export class RoundDetailsComponent {
  @Input() round!: Round;
}
