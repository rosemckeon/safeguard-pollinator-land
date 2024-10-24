import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroHandThumbUpSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-landscape-status',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroHandThumbUpSolid })],
  templateUrl: './landscape-status.component.html',
  styleUrl: './landscape-status.component.scss'
})
export class LandscapeStatusComponent {

}
