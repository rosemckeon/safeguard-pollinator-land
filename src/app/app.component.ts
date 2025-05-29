// @angular imports
import { ChangeDetectionStrategy, Component, inject, ViewChild, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { CropPollinationComponent } from './crop-pollination/crop-pollination.component';
import { EconomicValueComponent } from './economic-value/economic-value.component';
import { WildPollinationComponent } from './wild-pollination/wild-pollination.component';
import { AestheticValuesComponent } from './aesthetic-values/aesthetic-values.component';
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
    CropPollinationComponent,
    EconomicValueComponent,
    WildPollinationComponent,
    AestheticValuesComponent,
    MatButtonModule, 
    MatDialogModule,
    MatTooltipModule
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
[x: string]: any;
  saveDataService: SaveDataService = inject(SaveDataService);
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);
  // inject MatDialog to open dialogs
  readonly dialog = inject(MatDialog);

  @ViewChild(GlobalControlsComponent) globalControlsComponent?: GlobalControlsComponent;
  @ViewChild(GlobalResponsesComponent) globalResponsesComponent?: GlobalResponsesComponent;
  @ViewChild(LandscapeComponent) landscapeComponent?: LandscapeComponent;
  
  resetGlobalControls(): void {
    //console.log('triggered resetGlobalControls from AppComponent');
    this.habitatService.getActiveHabitatTypes(this.roundService.roundList[this.roundService.activeRound].landscape).then(
      (habitatCount: HabitatCount) => {
        let activeHabitatTypes = habitatCount;
        //console.log(activeHabitatTypes);
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
    this.roundService.scenario = 'agri_degraded';
 }

  ngOnInit(): void {
    // too early to calculate impacts
    // I can only get the stored dataCode here, not the first load of a new dataCode
    // console.log('ngOnInit', this.saveDataService.getDataCode());
  }

  openInfo(value: string):void {
    let temp: any;
    switch(value){
      case 'gameInfo':
        temp = this.dialog.open(GameInfoContent);
        break;
      case 'cropPollination':
        temp = this.dialog.open(CropPollination);
        break;
      case 'economicValueChain':
        temp = this.dialog.open(EconomicValueChain);
        break;
      case 'wildPlantPollination':
        temp = this.dialog.open(WildPlantPollination);
        break;
      case 'aestheticValues':
        temp = this.dialog.open(AestheticValues);
        break;
      default:
        console.log("AppComponent.openInfo - requested dialogue does not exist", value);
        break;
    }
    const dialogRef = temp;
    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  // this function is actionable from the AppComponent template
  // it triggers on click of the 'advance time' button
  advanceTime(from : number, scenario : string, dataCode: string | null, habitats : Habitat[], roundList : Round[]) {
    // do something here to pause all other interactions - like a loading animation
    // ******
    //console.log("AppComponent.advanceTime started", from, scenario, dataCode, habitats, roundList);
    let to : number = from + 1;
    let newRoundList : Round[] | null = this.roundService.advanceTime(from, to, habitats, roundList);
    // do something with the data after advancing time is complete
    if ( newRoundList == null ) {
      // array does not exist, is not an array, or is empty
      // ⇒ do not attempt to process array
      //console.log("AppComponent.advanceTime conditions not met", newRoundList)
    } else {
      // newRoundList has been populated and we still need to play another round
      if ( this.roundService.endRound != to ) {
        // this.resetGlobalControls();
      } else {
        // Or the game has finished.
        // Only save the data if we have a dataCode
        if ( dataCode != null ) {
          this.saveDataService.savePlayerData(scenario, dataCode, newRoundList);
        }
      }
      //console.log("AppComponent.advanceTime completed", this.roundService.activeRound, scenario, newRoundList);
    }
    // remove animation here
    // ******
  }

  submitDataCode(value: string) {
    //console.log("AppComponent.submitDataCode", value);
  }
}

@Component({
  selector: 'game-info-content',
  templateUrl: 'app.component.game-info-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInfoContent {}

@Component({
  selector: 'crop-pollination',
  templateUrl: 'app.component.crop-pollination.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropPollination {}

@Component({
  selector: 'economic-value-chain',
  templateUrl: 'app.component.economic-value-chain.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EconomicValueChain {}

@Component({
  selector: 'wild-plant-pollination',
  templateUrl: 'app.component.wild-plant-pollination.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WildPlantPollination {}

@Component({
  selector: 'aesthetic-values',
  templateUrl: 'app.component.aesthetic-values.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AestheticValues {}