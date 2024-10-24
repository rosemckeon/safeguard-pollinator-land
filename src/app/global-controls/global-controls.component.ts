import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowTurnRightDown, heroArrowLongLeft } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-global-controls',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ heroArrowTurnRightDown, heroArrowLongLeft })],
  templateUrl: './global-controls.component.html',
  styleUrl: './global-controls.component.scss'
})
export class GlobalControlsComponent {

}
