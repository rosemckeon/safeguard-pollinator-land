// angular
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Maths - we need this to do proper maths (default only has limited functions)
import * as Math from 'mathjs';
// interfaces
import { Round } from '../round';
import { Habitat } from '../habitat';
// services
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
// components
import { HabitatComponent } from '../habitat/habitat.component'


@Component({
  selector: 'app-landscape',
  standalone: true,
  imports: [CommonModule, HabitatComponent],
  templateUrl: './landscape.component.html',
  styleUrl: './landscape.component.scss'
})
export class LandscapeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);

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

  constructor(){  }

}
