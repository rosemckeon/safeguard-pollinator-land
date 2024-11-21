// angular
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Maths - we need this to do proper maths (default only has limited functions)
import * as Math from 'mathjs';
// interfaces
import { Round } from '../round';
import { RoundImpact } from '../round-impact';
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
  @Input() 
  set scenario(scenario: string){
    console.log('Input scenario set: ', scenario);
    //this.scenario$ = scenario;
    this.roundService.getStartingScenario(scenario).then((roundZero: Round) => {
      this.roundService.updateImpacts(
        roundZero.impact!,
        roundZero.landscape
      ).then(
        (impacts: RoundImpact[]) => {
          impacts.forEach((impact: RoundImpact) => {
            //console.log('Mean state change ', impact.name, Math.mean(impact.stateChangeValues!));
            impact.value = Math.round(Math.mean(impact.stateChangeValues!));
            this.roundService.roundImpacts.push(impact);
            //return(impact);
          });
          // once this is finished make impacts visible?
        }
      );
    });
  }

  constructor() {
    console.log("Scenario in LandscapeComponent Contructor", this.roundService.scenario);
  }
}
