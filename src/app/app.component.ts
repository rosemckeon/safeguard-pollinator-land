import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HabitatService } from './habitat.service';
import { RoundService } from './round.service';
import { Round } from './round';
import { LandscapeComponent } from './landscape/landscape.component';
import { LandscapeStatusComponent } from './landscape-status/landscape-status.component';
import { RoundDetailsComponent } from './round-details/round-details.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandscapeComponent, LandscapeStatusComponent, GlobalControlsComponent, NgIconComponent, CommonModule, RoundDetailsComponent],
  providers: [provideIcons({ heroArrowRight })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);
  title = 'game';
  
  constructor() {
    // Set the default loaded rounds
    // and apply the list of rounds/habitats to the constants defined as empty arrays in each service.
    this.roundService.getAllRounds().then(
      (roundList: Round[]) => {
        // could assign an active round here?
        this.roundService.roundList = roundList;
        this.roundService.roundAdvancedUpdateList = roundList;
        this.habitatService.habitatList = roundList[0].landscape;
        this.habitatService.habitatGlobalUpdateList = roundList[0].landscape;
      }
    );
  }
  advanceTime() {
    //console.log(this.landscapeService.getLandscape());
    //this.landscapeService.advanceTime(this.landscape.currentRound, this.landscape.score);
  }
}
