// @angular
import { inject, Injectable} from '@angular/core';
// Maths - we need this to do proper maths (default only has limited functions)
import * as Math from 'mathjs';
// components
import { HabitatService } from './habitat.service';
// interfaces 
import { Round } from './round';
//import { RoundImpact } from './round-impact';
import { Habitat } from './habitat';
// raw data
import RoundListA from '../data/scenario-A.json';
import RoundListB from '../data/scenario-B.json';
import stateToImpactValues from '../data/state-on-impact.json';
import { Impacts } from './impacts';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  habitatService: HabitatService = inject(HabitatService);
  Math = Math;
  scenario?: string;
  roundList: Round[] = [];
  roundImpacts: Impacts = this.getImpacts(0);
  //roundImpacts: RoundImpact[] = [];
  roundImpactsCalculated: boolean = false;
  activeRound!: number;
  endRound!: number;

  async getStartingScenario(value: string): Promise<Round[]> {
    console.log("triggered getStartingScenario from RoundService", value);
    this.scenario = value;
    if(value == "A"){
      this.roundList = RoundListA;
    } else {
      this.roundList = RoundListB;
    }
    this.activeRound = 0;
    // console.log('Active Round: ', this.activeRound);
    this.endRound = this.roundList.length - 1;
    // console.log('End Round: ', this.endRound);
    
    //this.habitatService.getLandscape(this.activeRound);
    this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    //this.habitatService.habitatGlobalUpdateList = this.roundList[this.activeRound].landscape;
    // console.log('Active Habitat Types: ', this.habitatService.getActiveHabitatTypes(this.roundList[this.activeRound].landscape));
    return(this.roundList);
  }
 
  async updateDisabledRounds(roundList: Round[]): Promise<Round[]> {
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

  async getStateEffectOnImpactValues(habitatType: string, stateName: string, stateValue: number, impactName: string): Promise<number[]> {
    //console.log('Triggered getStateEffectOnImpactValues from RoundService: ', habitatType, stateName, stateValue, impactName);
    let h : number | undefined;
    let s : number | undefined;
    let i : number | undefined;
    let result : number[];
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
      //console.log('Fetching values: ', h, s, i);
      // here we're getting the ditribution of possible values for a given state and impact
      result = stateToImpactValues.state[h].impact[s].values[i];
      //console.log(result);
      return(result);
    } else {
      if (typeof h != 'undefined' && typeof s != 'undefined' && typeof i == 'undefined') {
        // we do not have values for 2 impacts in semi-natural habitats
        result = [];
        //console.log(result);
        return(result);
      } else {
        console.log('WARNING: Problem fetching values: ', h, s, i);
        return([]);
      }
    }
  }

  getImpacts(m: number) {
    let impacts : Impacts = {
      "cropPollinationProduction": 0 + m,
      "economicValueChain": 0 + m,
      "wildPlantPollination": 0 + m,
      "aestheticValues": 0 + m
    }
    return impacts;
  }

  /*
  async getImpacts(habitats: Habitat[]): Promise<Impacts> {
    console.log("getImpact: ", habitats);
    var cropPollinationProduction : number[] = [];
    let economicValueChain : number[] = [];
    let wildPlantPollination : number[] = [];
    let aestheticValues : number[] = [];
    let impacts : Impacts = {
      "cropPollinationProduction": 0,
      "economicValueChain": 0,
      "wildPlantPollination": 0,
      "aestheticValues": 0
    }
    
    let stateNames: string[] = ['wildPollinators', 'floralResources', 'habitatResources'];
    let h: number = 0;
    let i1: number = 0;
    console.log('While: ', habitats.length);
    
    while(h <= habitats.length){
      console.log("Habitat: ", habitats[h]);
      // check for the final loop being completed
      if(h == habitats.length){
        // this is happening before all the values have been got
        // because fetching them is asynchronous
        //console.log("At the end: ", cropPollinationProduction, economicValueChain);
        //return(impacts);
      } else {
        let habitat : Habitat = habitats[h];
        stateNames.forEach((stateName: string, s: number, stateNames: string[]) => {
          console.log("----State: ", stateName);
          switch(stateName){
            // what happens in each case here could be written as a new function for conciseness
            case stateNames[0]:
              // collect possible impacts of wildPollinator score for all 4 states
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.wildPollinators!, "cropPollinationProduction"
              ).then((values: number[]) => {
                //console.log("------Values: ", values);
                cropPollinationProduction = cropPollinationProduction.concat(values);
                console.log("------Concat: ", cropPollinationProduction);
                // if we get 100 possibileValues for every state of every habitat we have 4800 to choose from.
                // However, there are 2 impacts which semi-natural habitats do not effect.
                // which can reduce the list. can i do a better check than length??
                // if we do something like this for every concat array of values then the return after the while loop is filled.
                if(cropPollinationProduction.length > 4200){
                  impacts.cropPollinationProduction = this.habitatService.sample(cropPollinationProduction);
                }
                //console.log(i1);
                //i1++;
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.wildPollinators!, "economicValueChain"
              ).then((values: number[]) => {
                economicValueChain = economicValueChain.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.wildPollinators!, "wildPlantPollination"
              ).then((values: number[]) => {
                wildPlantPollination = wildPlantPollination.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.wildPollinators!, "aestheticValues"
              ).then((values: number[]) => {
                aestheticValues = aestheticValues.concat(values);
              });
              break;
            case stateNames[1]:
              // collect possible impacts of floralResources for all 4 states
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.floralResources!, "cropPollinationProduction"
              ).then((values: number[]) => {
                cropPollinationProduction = cropPollinationProduction.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.floralResources!, "economicValueChain"
              ).then((values: number[]) => {
                economicValueChain = economicValueChain.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.floralResources!, "wildPlantPollination"
              ).then((values: number[]) => {
                wildPlantPollination = wildPlantPollination.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.floralResources!, "aestheticValues"
              ).then((values: number[]) => {
                aestheticValues = aestheticValues.concat(values);
              });
              break;
            case stateNames[2]:
              // collect possible impacts of habitatResources for all 4 states
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.habitatResources!, "cropPollinationProduction"
              ).then((values: number[]) => {
                cropPollinationProduction = cropPollinationProduction.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.habitatResources!, "economicValueChain"
              ).then((values: number[]) => {
                economicValueChain = economicValueChain.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.habitatResources!, "wildPlantPollination"
              ).then((values: number[]) => {
                wildPlantPollination = wildPlantPollination.concat(values);
              });
              this.getStateEffectOnImpactValues(
                habitat.type.active, stateName, habitat.state!.habitatResources!, "aestheticValues"
              ).then((values: number[]) => {
                aestheticValues = aestheticValues.concat(values);
              });
              break;
            default:
              console.log("--Warning: state name not recognised.", stateName);
              break;
          }
          console.log("Outside the switch: ", cropPollinationProduction, economicValueChain);
          impacts.cropPollinationProduction = this.habitatService.sample(cropPollinationProduction);
        });
        h++
      }

    }
    
    return(impacts);
    // loop through each habitat to get effects each state of habitat has on impact
  }
  */

/*
  async updateImpacts(impacts: RoundImpact[], habitats: Habitat[]): Promise<RoundImpact[]> {
    console.log('Triggered updateImpacts from RoundService', impacts, habitats);
    // use the current scores as starting values
    //let roundImpacts: RoundImpact[] = this.roundImpacts;
    let stateNames: string[] = ['wildPollinators', 'floralResources', 'habitatResources'];
    //let stateValues: number[] | [];
    //let possibleValues: number[] | void = [];
    // take the habitats, get the state values and use those to getStateEffectOnImpactValues
    habitats.forEach((habitat: Habitat) => {
      console.log('--habitat: ', habitat.id, habitat.type.active);
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
          this.getStateEffectOnImpactValues(habitat.type.active, stateName, stateValue, impact.name).then(
            (possibleValues :  number[] | void) => {
            console.log('Possible values: ', possibleValues);
            if(impact.hasOwnProperty('stateChangeValues')){
              //impact.stateChangeValues!.push(this.habitatService.sample(possibleValues!));
              impact.stateChangeValues!.push(this.habitatService.sample(possibleValues!));
            } else {
              // create it with first value
              impact.stateChangeValues = [this.habitatService.sample(possibleValues!)];
              //impact.stateChangeValues.push(this.habitatService.sample(possibleValues!));
            } 
          });
        });
      });
    });    
    console.log('Impacts updated: ', impacts);
    this.roundImpactsCalculated = true;
    return(impacts);
  }
*/
  constructor() {
    // too early to updateImpacts
    //this.roundImpacts = this.getImpacts(this.activeRound);
  }

  async advanceTime(to: number): Promise<Round[]> {
    console.log('triggered advanceTime from RoundService: ', to);
    // do something here to pause all other interactions.

    // store all the changes to habitatList in the roundList the finished active round
    this.roundList[this.activeRound].landscape = this.habitatService.habitatList;
    // then update the active round
    this.activeRound = to;
    this.updateDisabledRounds(this.roundList).then((roundList: Round[]) => {
      this.roundList = roundList;
    });
    //this.habitatService.applyGlobalHabitatChanges(this.habitatService.habitatList);
    // store all the changes to habitatList in the roundList for the next active round (so we have a starting state for that round)
    this.roundList[this.activeRound].landscape = this.habitatService.habitatList;
    // do the same with round impacts...
    //this.roundList[this.activeRound].impacts = this.roundImpacts;
    // apply responses so they are active on the next round
    // might make this a round service function that triggers a habitat service function internally.
    // to do that I need to regig when things are happening. 
    // so that the active round is only updated after everything else is processed.

    this.habitatService.applyResponses(this.habitatService.habitatList).then((habitats : Habitat[]) => {
      console.log('applyResponses completed: ', habitats); // should show all habitats with response enabled values copied from global/localChange. (confirmed)
      // once all the responses are enabled/disabled we pass the habitatList to updateStates
      this.habitatService.updateStates(habitats).then((habitats: Habitat[]) => {
        console.log('updateStates completed: ', habitats); // should show all habitats with state values adjusted (confirmed)
        // when all those maths are done we save the service habitatList so it shows as active in LandscapeComponent
        this.habitatService.habitatList = habitats;
        // and then we can update the round impacts.
        // this simple addition works fine.
        console.log(this.getImpacts(this.activeRound));
        this.roundImpacts = this.getImpacts(this.activeRound);
        // however the attempt below didn't work.
        /*
        this.updateImpacts(this.roundImpacts, habitats).then((roundImpacts : RoundImpact[]) => {
          console.log('updateImpacts completed ', roundImpacts);
          // and update the service variable on completion
          this.roundImpacts = roundImpacts;
        });
        */
      });
    });
    //this.roundList[this.activeRound].activeHabitatTypes = this.habitatService.getActiveHabitatTypes(this.habitatService.habitatList);
    // why have i copied it back the other way??? don't think we need this
    //this.habitatService.habitatList = this.roundList[this.activeRound].landscape;
    console.log('New Active Round: ', this.activeRound);   
    console.log(this.roundList[this.activeRound]);
    return(this.roundList);
  }
}
