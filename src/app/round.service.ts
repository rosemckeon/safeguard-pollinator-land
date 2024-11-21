// @angular
import { inject, Injectable} from '@angular/core';
// Maths - we need this to do proper maths (default only has limited functions)
import * as Math from 'mathjs';
// components
import { HabitatService } from './habitat.service';
// interfaces 
import { Round } from './round';
import { RoundImpact } from './round-impact';
import { Habitat } from './habitat';
// raw data
import RoundListA from '../data/scenario-A.json';
import RoundListB from '../data/scenario-B.json';
import stateToImpactValues from '../data/state-on-impact.json';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  habitatService: HabitatService = inject(HabitatService);
  Math = Math;
  scenario?: string;
  roundList: Round[] = [];
  roundImpacts: RoundImpact[] = [];
  activeRound!: number;
  endRound!: number;

  async getStartingScenario(value: string): Promise<Round> {
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
    return(this.roundList[this.activeRound]);
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

  getStateEffectOnImpactValues(habitatType: string, stateName: string, stateValue: number, impactName: string): number[] | void {
    console.log('Triggered getStateEffectOnImpactValues from RoundService: ', habitatType, stateName, stateValue, impactName);
    let h : number | undefined;
    let s : number | undefined;
    let i : number | undefined;
    let result : number[] | void;
    switch (habitatType) {
      case 'Semi-natural':
        h = 2;
        switch (impactName) {
          case 'cropPollinationProduction':
            // there are no values to get
            break;
          case 'economicValueChain':
            // there are no values to get
            break;
          case 'wildPlantPollination':
            i = 0;
            break;
          case 'aestheticValues':
            i = 1;
            break;
          default:
            console.log('WARNING: impactName not recognised: ', impactName);
            break;
        }
        break;
      case 'Agricultural':
        h = 0;
        switch (impactName) {
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
        break;
      case 'Urban':
        h = 1;
        switch (impactName) {
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
        break;
      default:
        console.log('WARNING: HabitatType not recognised.', habitatType);
        break;
    } 
    // states do not differ across habitats
    switch (stateName) {
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
    if (typeof h != 'undefined' && typeof s != 'undefined' && typeof i != 'undefined') {
      console.log('Fetching values: ', h, s, i);

      result = stateToImpactValues.state[h].impact[s].values[i].map( value => {
        //console.log(value, stateValue);
        if(value == 0){
          return(0);
        } else {
          return(stateValue * ( ( value * 2 * 10 ) / 10 ));
        }
      });

      console.log(result);
      return(result);
    } else {
      if (typeof h != 'undefined' && typeof s != 'undefined' && typeof i == 'undefined') {
        // we do not have values for 2 impacts in semi-natural habitats
        result = [0];
        console.log(result);
        return(result);
      } else {
        console.log('WARNING: Problem fetching values: ', h, s, i);
      }
    }
  }

  async updateImpacts(impacts: RoundImpact[], habitats: Habitat[]): Promise<RoundImpact[]> {
    console.log('Triggered updateImpacts from RoundService', impacts, habitats);
    // use the current scores as starting values
    //let roundImpacts: RoundImpact[] = this.roundImpacts;
    let stateNames: string[] = ['wildPollinators', 'floralResources', 'habitatResources'];
    //let stateValues: number[] | [];
    let possibleValues: number[] | void = [];
    // take the habitats, get the state values and use those to getStateEffectOnImpactValues
    habitats.forEach((habitat: Habitat) => {
      console.log('habitat: ', habitat.id, habitat.type.active);
      stateNames.forEach((stateName: string) => {
        let stateValue: number = 0;
        switch (stateName){
          case 'wildPollinators':
            stateValue = habitat.state!.wildPollinators!;
            break;
          case 'floralResources':
            stateValue = habitat.state!.floralResources!;
            break;
          case 'habitatResources':
            stateValue = habitat.state!.habitatResources!;
            break;
          default:
            console.log('WARNING: stateName not recognised.');
            break;
        }
        impacts.forEach((impact: RoundImpact) => {
          possibleValues = this.getStateEffectOnImpactValues(habitat.type.active, stateName, stateValue, impact.name);
          console.log('Possible values: ', possibleValues);
          if(impact.hasOwnProperty('stateChangeValues')){
            //impact.stateChangeValues!.push(this.habitatService.sample(possibleValues!));
            this.habitatService.sample(possibleValues!)
          } else {
            // create it first then push
            impact.stateChangeValues = [];
            impact.stateChangeValues.push(this.habitatService.sample(possibleValues!));
          } 
        });
      });
    });    
    console.log('Impacts updated: ', impacts);
    return(impacts);
  }

  constructor() {
    // too early to updateImpacts
  }

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
        // when all those maths are done we save the service habitatList so it shows as active in LandscapeComponent
        this.habitatService.habitatList = habitats;
        // and then we can update the round impacts.
        // this doesn't currently work.
        this.updateImpacts(this.roundImpacts, habitats).then((roundImpacts : RoundImpact[]) => {
          console.log('updateImpacts completed ', roundImpacts);
          // and update the service variable on completion
          this.roundImpacts = roundImpacts;
        });
        
      });
    });
    //this.roundList[this.activeRound].activeHabitatTypes = this.habitatService.getActiveHabitatTypes(this.habitatService.habitatList);
    // why have i copied it back the other way??? don't think we need this
    //this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    console.log('New Active Round: ', this.activeRound);   
    console.log(this.roundList[this.activeRound]);
  }
}
