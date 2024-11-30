// @angular imports
import { ChangeDetectionStrategy, Component, inject, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
// @ng-icons imports
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroArrowUp, 
  heroArrowDown, 
  heroArrowRight,
  heroArrowLeft, 
  heroArrowPath
} from '@ng-icons/heroicons/outline';
import { 
  heroInformationCircleSolid 
} from '@ng-icons/heroicons/solid';
// interfaces
import { Round } from './round';
import { Habitat } from './habitat';
// services
import { HabitatService } from './habitat.service';
import { RoundService } from './round.service';
import { SaveDataService } from './save-data.service';
// components
import { LandscapeComponent } from './landscape/landscape.component';
import { RoundDetailsComponent } from './round-details/round-details.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { GlobalResponsesComponent } from './global-responses/global-responses.component';
import { HabitatCount } from './habitat-count';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    GlobalResponsesComponent, 
    NgIconComponent, 
    CommonModule, 
    RoundDetailsComponent, 
    MatButtonModule, 
    MatDialogModule
  ],
  providers: [
    provideIcons({ 
      heroArrowUp,
      heroArrowDown,
      heroArrowRight, 
      heroArrowLeft, 
      heroArrowPath, 
      heroInformationCircleSolid
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  saveDataService: SaveDataService = inject(SaveDataService);
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);
  @ViewChild(GlobalControlsComponent) globalControlsComponent?: GlobalControlsComponent;
  @ViewChild(GlobalResponsesComponent) globalResponsesComponent?: GlobalResponsesComponent;
  @ViewChild(LandscapeComponent) landscapeComponent?: LandscapeComponent;
  title = 'game';

  readonly dialog = inject(MatDialog);

  resetGlobalControls(): void {
    console.log('triggered resetGlobalControls from AppComponent');
    this.habitatService.getActiveHabitatTypes(this.roundService.roundList[this.roundService.activeRound].landscape).then(
      (habitatCount: HabitatCount) => {
        let activeHabitatTypes = habitatCount;
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
    );
  }

  constructor() {
    //makes sure scenario is never undefined.
    this.roundService.scenario = 'A';
  }

  ngOnInit(): void {
    // too early to calculate impacts
  }

  openGameInfo() {
    const dialogRef = this.dialog.open(gameInfoContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // this function is actionable from the AppComponent template
  // it triggers on click of the 'advance time' button
  advanceTime(from : number, scenario : string, habitats : Habitat[], roundList : Round[]) {
    // do something here to pause all other interactions - like a loading animation
    // ******
    console.log("AppComponent.advanceTime started", from, scenario, habitats, roundList);
    let to : number = from + 1;
    let newRoundList : Round[] | null = this.roundService.advanceTime(from, to, habitats, roundList);
    // do something with the data after advancing time is complete
    if ( newRoundList == null ) {
      // array does not exist, is not an array, or is empty
      // ⇒ do not attempt to process array
      console.log("AppComponent.advanceTime conditions not met", newRoundList)
    } else {
      // newRoundList has been populated and we still need to play another round
      if ( this.roundService.endRound != to ) {
        // this.resetGlobalControls();
      } else {
        // Or the game has finished.
        this.saveDataService.savePlayerData(scenario, newRoundList);
      }
      console.log("AppComponent.advanceTime completed", this.roundService.activeRound, scenario, newRoundList);
    }
    // remove animation here
    // ******
  }
}

@Component({
  selector: 'game-info-content',
  templateUrl: 'app.component.game-info-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class gameInfoContent {}