import { inject, Injectable } from '@angular/core';
import { Round } from './round';
import { Habitat } from './habitat';
import { HabitatService } from './habitat.service';
import RoundListA from '../data/scenario-A.json';
import RoundListB from '../data/scenario-B.json';
import stateToImpactValues from '../data/state-on-impact.json';
import { RoundImpact } from './round-impact';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  habitatService: HabitatService = inject(HabitatService);
  scenario?: string;
  roundList: Round[] = [];
  roundImpacts: RoundImpact[] = [];
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
    this.roundImpacts = this.roundList[this.activeRound].impact!
    console.log(this.roundImpacts);
    //this.habitatService.getLandscape(this.activeRound);
    this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    //this.habitatService.habitatGlobalUpdateList = this.roundList[this.activeRound].landscape;
    console.log('Active Habitat Types: ', this.habitatService.getActiveHabitatTypes(this.roundList[this.activeRound].landscape));
    //return this.roundList[this.activeRound].landscape;
  }
 
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

  getStateEffectOnImpactValues(habitatType: string, stateName: string, impactName: string): number[] | void {
    console.log('Triggered getStateEffectOnImpactValues from RoundService: ', habitatType, stateName, impactName);
    let h : number | undefined;
    let s : number | undefined;
    let i : number | undefined;
    let result : number[] | void;
    switch(habitatType){
      case 'Semi-natural':
        h = 1;
        break;
      case 'Agricultural':
        h = 0;
        break;
      case 'Urban':
        h = 2;
        break;
      default:
        console.log('WARNING: HabitatType not recognised.', habitatType);
        break;
    } 
    // states do not differ across habitats
    switch(stateName){
      case 'wildPollinators':
        s = 0;
        break;
      case 'floralResources':
        s = 1;
        break;
      case 'habitatResources':
        s = 2;
        break;
      default:
        console.log('WARNING: stateName not recognised.', stateName);
        break;
    }
    switch(impactName){
      case 'cropPollinationProduction':
        i = 0;
        break;
      case 'economicValueChain':
        i = 1;
        break;
      case 'wildPlantPollination':
        i = 2;
        break;
      case 'aestheticValues':
        i = 3;
        break;
      default:
        console.log('WARNING: impactName not recognised: ', impactName);
        break;
    }
    if(typeof h != 'undefined' && typeof s != 'undefined' && typeof i != 'undefined'){
      result = stateToImpactValues.state[h].impact[s].values[i];
      return(result);
    } 
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
    // store all the changes to habitatList in the roundList for the next active round (so we have a starting state for that round)
    this.roundList[this.activeRound].landscape = this.habitatService.habitatList;
    // do the same with round impacts...
    this.roundList[this.activeRound].impact = this.roundImpacts;
    // apply responses so they are active on the next round
    this.habitatService.applyResponses(this.habitatService.habitatList).then((habitats : Habitat[]) => {
      console.log('applyResponses completed: ', habitats); // should show all habitats with response enabled values copied from global/localChange. (confirmed)
      // once all the responses are enabled/disabled we pass the habitatList to updateStates
      this.habitatService.updateStates(habitats).then((habitats: Habitat[]) => {
        console.log('updateStates completed: ', habitats); // should show all habitats with state values adjusted (confirmed)
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
