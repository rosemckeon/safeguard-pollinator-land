import { inject, Injectable } from '@angular/core';
import { Round } from './round';
import { Habitat } from './habitat';
import { HabitatService } from './habitat.service';
import RoundListA from '../data/scenario-A.json';
import RoundListB from '../data/scenario-B.json';


@Injectable({
  providedIn: 'root'
})
export class RoundService {
  //url = 'http://localhost:3000/rounds';
  //roundListA:Round[] = RoundListA;
  //roundListB:Round[] = RoundListB;
  habitatService: HabitatService = inject(HabitatService);
  scenario?: string;
  roundList:Round[] = [];
  activeRound!: number;
  endRound!: number;

  async getStartingScenario(value: string) {
    console.log("triggered getStartingScenario from RoundService");
    console.log('Scenario: ', value);
    this.scenario = value;
    if(value == "A"){
      this.roundList = RoundListA;
    } else {
      this.roundList = RoundListB;
    }
    this.activeRound = 0;
    console.log('Active Round: ', this.activeRound);
    this.endRound = this.roundList.length - 1;
    console.log('End Round: ', this.endRound);
    console.log(this.roundList);
    //this.habitatService.getLandscape(this.activeRound);
    this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    this.habitatService.habitatGlobalUpdateList = this.roundList[this.activeRound].landscape;
    console.log('Active Habitat Types: ', this.roundList[this.activeRound].activeHabitatTypes);
    //return this.roundList[this.activeRound].landscape;
  }
  /*
  async getRoundById(value: keyof typeof this.roundList): Promise<Round[]> {
    return this.roundList[value];
  }
  */
  

  //add any functions need to advance time here.
  updateDisabledRounds(roundList: Round[]) {
    console.log('triggered updateDisabledRounds from RoundService');
    for (var i = 0; i <  roundList.length; i++) {
      if(this.activeRound == roundList[i].id){
        roundList[i].disabled = '';
      } else {
        roundList[i].disabled = 'disabled';
      }
    }
    return roundList;
  }
  
  constructor() {}
  advanceTime(to: number){
    console.log('triggered advanceTime from RoundService: ', to);
    // do some clever stuff here with maths etc to update scores?...
    // or only calculate scores from habitats
    this.activeRound = to;
    this.roundList = this.updateDisabledRounds(this.roundList);
    this.habitatService.applyGlobalHabitatChanges(this.habitatService.habitatGlobalUpdateList);
    this.roundList[this.activeRound].landscape = this.habitatService.habitatList;
    this.roundList[this.activeRound].activeHabitatTypes = this.habitatService.getActiveHabitatTypes(this.habitatService.habitatList);
    this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    this.habitatService.habitatGlobalUpdateList = this.roundList[this.activeRound].landscape;
    console.log('New Active Round: ', this.activeRound);   
    console.log(this.roundList[this.activeRound]);
  }
}
