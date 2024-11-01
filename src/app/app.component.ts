import { Component, inject, ViewChild } from '@angular/core';
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
  @ViewChild(GlobalControlsComponent) globalControlsComponent?: GlobalControlsComponent;
  title = 'game';

  resetGlobalControls(): void {
    console.log('triggered resetGlobalControls from AppComponent');
    let activeHabitatTypes = this.roundService.roundList[this.roundService.activeRound].activeHabitatTypes;
    console.log(activeHabitatTypes);
    // put these into a loop to be more concise? Bit tricky 
    let globalSeminatural = <HTMLButtonElement>document.getElementById('globalSeminatural');
    globalSeminatural.value = "";
    this.globalControlsComponent?.updateGlobalControlClasses('globalSeminatural', this.globalControlsComponent?.seminaturalClasses);
    if(activeHabitatTypes?.['Semi-natural'] == 0){ globalSeminatural.disabled = true; } else { globalSeminatural.disabled = false; }

    let globalAgricultural = <HTMLButtonElement>document.getElementById('globalAgricultural');
    globalAgricultural.value = "";
    this.globalControlsComponent?.updateGlobalControlClasses('globalAgricultural', this.globalControlsComponent?.agriculturalClasses);
    if(activeHabitatTypes?.Agricultural == 0){ globalAgricultural.disabled = true; } else { globalAgricultural.disabled = false; }

    let globalUrban = <HTMLButtonElement>document.getElementById('globalUrban');
    globalUrban.value = "";
    this.globalControlsComponent?.updateGlobalControlClasses('globalUrban', this.globalControlsComponent?.urbanClasses);
    if(activeHabitatTypes?.Urban == 0){ globalUrban.disabled = true; } else { globalUrban.disabled = false; }
  }

  constructor() {
    // Set the default loaded rounds
    // and apply the list of rounds/habitats to the constants defined as empty arrays in each service.
    this.roundService.getAllRounds().then(
      (roundList: Round[], activeRound = 0) => {
        // game always loads on round zero
        // may need a way to handle crashes later to load mid-game
        //console.log('Active Round: ', this.roundService.activeRound);  
        this.roundService.activeRound = activeRound;
        console.log('Active Round: ', this.roundService.activeRound);  
        this.roundService.roundList = roundList;
        this.roundService.roundAdvancedUpdateList = roundList;
        this.habitatService.habitatList = roundList[activeRound].landscape;
        this.habitatService.habitatGlobalUpdateList = roundList[activeRound].landscape;
        console.log('Active Habitat Types: ', roundList[activeRound].activeHabitatTypes);
      }
    );
  }

  // this function is actionable from the AppComponent template
  advanceTime(from = this.roundService.activeRound) {
    console.log('triggered advanceTime from AppComponent')
    console.log('Next Round: ', from + 1);
    // the fancy round specific stuff happens in the service function,
    // but anything that aslo uses the habitat service happens here.
    this.roundService.advanceTime(from + 1).then(
      (roundList: Round[], previousRound = from, activeRound = this.roundService.activeRound) => {
        this.roundService.roundList = this.roundService.updateDisabledRounds(roundList);
        this.habitatService.applyGlobalHabitatChanges(this.habitatService.habitatGlobalUpdateList);
        roundList[activeRound].landscape = this.habitatService.habitatList;
        roundList[activeRound].activeHabitatTypes = this.habitatService.getActiveHabitatTypes(this.habitatService.habitatList);
        console.log(roundList[activeRound]);
        this.habitatService.habitatList = roundList[activeRound].landscape;
        this.habitatService.habitatGlobalUpdateList = roundList[activeRound].landscape;
        this.resetGlobalControls();
      }
    );
    console.log('Active Round: ', this.roundService.activeRound);   
  }
}
