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
  habitatService: HabitatService = inject(HabitatService);
  scenario?: string;
  roundList: Round[] = [];
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
    //this.habitatService.habitatGlobalUpdateList = this.roundList[this.activeRound].landscape;
    console.log('Active Habitat Types: ', this.habitatService.getActiveHabitatTypes(this.roundList[this.activeRound].landscape));
    //return this.roundList[this.activeRound].landscape;
  }
 

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
    // store all the changes to habitatList in the roundList the finished active round
    this.roundList[this.activeRound].landscape = this.habitatService.habitatList;
    // then update the active round
    this.activeRound = to;
    this.roundList = this.updateDisabledRounds(this.roundList);
    //this.habitatService.applyGlobalHabitatChanges(this.habitatService.habitatList);
    // store all the changes to habitatList in the roundList for the next active round
    this.roundList[this.activeRound].landscape = this.habitatService.habitatList;
    // apply responses so they are active on the next round
    this.habitatService.applyResponses(this.habitatService.habitatList).then((habitats : Habitat[]) => {
      console.log('applyResponses completed: ', habitats); // should show all habitats with response enabled values copied from global/localChange.
      // once all the responses are enabled/disabled we pass the habitatList to updateStates
      this.habitatService.updateStates(habitats).then((habitats: Habitat[]) => {
        console.log('updateStates completed: ', habitats); // should show all habitats with state values adjusted
        // and when all those maths are done we save the service habitatList
        // But not before caluclating our new progress bar values
        // habitats[i].stateValue = this.habitatService.calculateHabitatStateValue(newStateValues[0], newStateValues[1], newStateValues[2]);
        // so it shows as active in LandscapeComponent
        this.habitatService.habitatList = habitats;
      });
    });
    //this.roundList[this.activeRound].activeHabitatTypes = this.habitatService.getActiveHabitatTypes(this.habitatService.habitatList);
    // why have i copied it back the other way??? don't think we need this
    //this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    console.log('New Active Round: ', this.activeRound);   
    console.log(this.roundList[this.activeRound]);
  }
}
