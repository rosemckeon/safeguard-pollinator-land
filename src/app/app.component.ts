import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';
import { LandscapeStatusComponent } from './landscape-status/landscape-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandscapeComponent, LandscapeStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'game';
  round = 0;
}
