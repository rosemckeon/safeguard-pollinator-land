import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandscapeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'game';
  round = 0;
}
