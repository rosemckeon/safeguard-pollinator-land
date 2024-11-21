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
  heroArrowLongLeft, 
  heroArrowPath
} from '@ng-icons/heroicons/outline';
import { 
  heroInformationCircleSolid 
} from '@ng-icons/heroicons/solid';
// services
import { HabitatService } from './habitat.service';
import { RoundService } from './round.service';
// components
import { LandscapeComponent } from './landscape/landscape.component';
//import { LandscapeStatusComponent } from './landscape-status/landscape-status.component';
import { RoundDetailsComponent } from './round-details/round-details.component';
import { RoundImpactsComponent } from './round-impacts/round-impacts.component';
import { GlobalControlsComponent } from './global-controls/global-controls.component';
import { GlobalResponsesComponent } from './global-responses/global-responses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    //LandscapeComponent, 
    //LandscapeStatusComponent, 
    //GlobalControlsComponent, 
    GlobalResponsesComponent, 
    NgIconComponent, 
    CommonModule, 
    RoundDetailsComponent, 
    RoundImpactsComponent, 
    MatButtonModule, 
    MatDialogModule
  ],
  providers: [
    provideIcons({ 
      heroArrowUp,
      heroArrowDown,
      heroArrowRight, 
      heroArrowLongLeft, 
      heroArrowPath, 
      heroInformationCircleSolid
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);
  @ViewChild(GlobalControlsComponent) globalControlsComponent?: GlobalControlsComponent;
  @ViewChild(GlobalResponsesComponent) globalResponsesComponent?: GlobalResponsesComponent;
  @ViewChild(LandscapeComponent) landscapeComponent?: LandscapeComponent;
  title = 'game';

  readonly dialog = inject(MatDialog);

  resetGlobalControls(): void {
    console.log('triggered resetGlobalControls from AppComponent');
    let activeHabitatTypes = this.habitatService.getActiveHabitatTypes(this.roundService.roundList[this.roundService.activeRound].landscape)
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
  advanceTime(from = this.roundService.activeRound) {
    console.log('triggered advanceTime from AppComponent');
    console.log("Scenario in AppComponent advanceTime", this.roundService.scenario);
    this.roundService.advanceTime(from + 1);
    if(this.roundService.endRound != this.roundService.activeRound){
      // this.resetGlobalControls();
    } else {
      // save the complete round json file.
    }
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