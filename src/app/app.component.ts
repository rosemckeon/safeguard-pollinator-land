import { Component, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HabitatService } from './habitat.service';
import { RoundService } from './round.service';
import { LandscapeComponent } from './landscape/landscape.component';
import { LandscapeStatusComponent } from './landscape-status/landscape-status.component';
import { RoundDetailsComponent } from './round-details/round-details.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowRight } from '@ng-icons/heroicons/outline';
import { heroArrowPath } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandscapeComponent, LandscapeStatusComponent, GlobalControlsComponent, NgIconComponent, CommonModule, RoundDetailsComponent],
  providers: [provideIcons({ heroArrowRight, heroArrowPath })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);
  @ViewChild(GlobalControlsComponent) globalControlsComponent?: GlobalControlsComponent;
  @ViewChild(LandscapeComponent) landscapeComponent?: LandscapeComponent;
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
    //makes sure scenario is never undefined.
    this.roundService.scenario = 'A';
  }

  // this function is actionable from the AppComponent template
  advanceTime(from = this.roundService.activeRound) {
    console.log('triggered advanceTime from AppComponent');
    console.log("Scenario in AppComponent advanceTime", this.roundService.scenario);
    this.roundService.advanceTime(from + 1);
    if(this.roundService.endRound != this.roundService.activeRound){
      this.resetGlobalControls();
    } else {
      // save the complete round json file.
    }
  }
}
