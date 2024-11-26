import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatResponse } from '../habitat-response';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid, heroXCircleSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-habitat-response',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroCheckCircleSolid, heroXCircleSolid })],
  templateUrl: './habitat-response.component.html',
  styleUrl: './habitat-response.component.scss'
})
export class HabitatResponseComponent {
  @Input() habitatResponse!: HabitatResponse;

  constructor(){}
  
}
