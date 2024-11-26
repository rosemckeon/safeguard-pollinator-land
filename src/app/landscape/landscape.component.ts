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
  @Input() 
  set scenario(scenario: string){
    //console.log('Input scenario set: ', scenario);
    //this.scenario$ = scenario;
    //this.roundService.getStartingScenario(scenario).then((roundZero: Round) => {
    this.roundService.getStartingScenario(scenario).then(
      (roundList: Round[]) => {
      console.log("--Scenerio got: ", roundList, this.roundService.activeRound);
      //console.log('roundImpactsCalculated: ', this.roundService.roundImpactsCalculated);
      //console.log(roundList[this.roundService.activeRound].landscape);
      let habitats : Habitat[] = roundList[this.roundService.activeRound].landscape;
      //console.log(this.roundService.getImpacts(this.roundService.activeRound, habitats));
      this.roundService.roundImpacts = this.roundService.getImpacts(this.roundService.activeRound, habitats);
      console.log("--roundImpacts set from Landscape Component", this.roundService.roundImpacts);
      /*
      this.roundService.getImpacts(roundList[0].landscape).then(
        (impacts: Impacts) =>{
          console.log("--Impacts got: ", impacts);
        }
      );
      */
      // even though the boolean is fale above, these two variables are almost identical below - both with filled values.
      // roundService.roundImpacts looks empty and yet full at the same time?
      //console.log(this.roundService.roundImpacts, roundZero.impact!);
      /*
      this.roundService.updateImpacts(
        roundList
        //roundZero.impact!,
        //roundZero.landscape
      //).then((impacts: RoundImpact[]) => {
      ).then((roundList: Round[]) => {
          console.log('roundImpactsCalculated: ', this.roundService.roundImpactsCalculated);
          
          impacts.forEach((impact: RoundImpact) => {
            //console.log('Mean state change ', impact.name, Math.mean(impact.stateChangeValues!));
            // we take the mean to fill the missing value in each iteration
            impact.value = Math.round(Math.mean(impact.stateChangeValues!));
            // and also fill the round service variable with the complete data
            this.roundService.roundImpacts.push(impact);
            //return(impact);
          });
          
          // once this loop is finished make impacts visible? 
        }
      );
      */
    });
  }

  constructor() {
    //console.log("Scenario in LandscapeComponent Contructor", this.roundService.scenario);
  }
}
