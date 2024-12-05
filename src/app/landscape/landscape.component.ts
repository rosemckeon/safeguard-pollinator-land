// angular
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
// Maths - we need this to do proper maths (default only has limited functions)
//import * as Math from 'mathjs';
// interfaces
import { Round } from '../round';
import { Habitat } from '../habitat';
// services
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
// components
import { HabitatComponent } from '../habitat/habitat.component'
//import { MatDialog, MatDialogModule } from '@angular/material/dialog';
//import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-landscape',
  standalone: true,
  imports: [CommonModule, HabitatComponent],
  templateUrl: './landscape.component.html',
  styleUrl: './landscape.component.scss'
})
export class LandscapeComponent {
  //route: ActivatedRoute = inject(ActivatedRoute);
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);
  //readonly dialog = inject(MatDialog);

  @Input() set scenario(scenario: string){
    this.roundService.getStartingScenario(scenario).then(
      (roundList: Round[]) => {
      //console.log("--Scenerio got: ", this.roundService.scenario, this.roundService.activeRound, roundList);
      let habitats : Habitat[] = roundList[this.roundService.activeRound].landscape;
      // set the roundImpact variable so that they display in app component
      this.roundService.roundImpacts = this.roundService.getImpacts(habitats);
      //console.log("--roundImpacts set from Landscape Component", this.roundService.roundImpacts);
      this.roundService.saveImpacts(this.roundService.activeRound, this.roundService.roundImpacts, roundList);
    });
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const requestCode = this.route.snapshot.paramMap.get('requestCode');
    //console.log("LandscapeComponent.ngOnInint requestCode", requestCode);
    this.roundService.playAgainURL = this.roundService.setPlayAgainURL(this.roundService.scenario!, requestCode);
    // save the requestCode = whatever string follows /A/ or /B/ or null.
    this.roundService.dataCode = this.roundService.saveDataCode(requestCode);
  }

  /*
  openRequestCode() {
    const dialogRef = this.dialog.open(DataCode);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`DataCode Dialog result: ${result}`);
    });
  }
  */
}

/*
@Component({
  selector: 'data-code',
  templateUrl: './landscape.component.data-code.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCode {}
*/