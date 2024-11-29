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
import { ImpactValues } from './impact-values';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  habitatService: HabitatService = inject(HabitatService);
  Math = Math;
  scenario?: string;
  roundList: Round[] = [];
  roundImpacts: Impacts = this.getStartingImpacts();
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

  getStateEffectOnImpactValues(habitatType: string, stateName: string, stateValue: number, impactName: string): ImpactValues {
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
      //return(result);
    } else {
      if (typeof h != 'undefined' && typeof s != 'undefined' && typeof i == 'undefined') {
        // we do not have values for 2 impacts in semi-natural habitats
        result = [];
        //console.log(result);
        //return(result);
      } else {
        console.log('WARNING: Problem fetching values: ', h, s, i);
        result = [];
        //return([]);
      }
    }
    let output : ImpactValues = {
      "name": impactName,
      // use the stateValue to modify scores returned. 
      // Each score becomes proportional to the percentage of the state
      "values": result.map((value: number) => {return Math.round(value * (stateValue / 100), 2)})
    }
    return output;
  }

  // We need the type object to be fulfilled at the very beginning
  // this ocntent gets overwritten very quickly by getImpacts which is triggered from
  // the landscape component when the starting scenario has been set.
  getStartingImpacts(): Impacts {
    // then build the impacts to return
    let impacts : Impacts = {
      "cropPollinationProduction": 0,
      "economicValueChain": 0,
      "wildPlantPollination": 0,
      "aestheticValues": 0
    }
    return impacts;
  }

  // Once there are habitats set to use, we can do something more complicated to get impacts
  // This needs to be done in the app component after the scenario is set, and
  // on advanceTime once updates to the active habitats have been made.
  getImpacts(activeRound: number, habitats: Habitat[]): Impacts {
    // do something with the habitats
    let effects : Impacts = this.getHabitatEffects(habitats);
    // get the current impacts scores to change if we want to do something additive
    //let impacts: Impacts = this.roundImpacts;
    // then make the changes
    let newImpacts : Impacts = {
      "cropPollinationProduction": effects.cropPollinationProduction,
      "economicValueChain": effects.economicValueChain,
      "wildPlantPollination": effects.wildPlantPollination,
      "aestheticValues": effects.aestheticValues
    }
    // but also ensure a ceiling of 100
    let output: Impacts = this.checkImpactsCeiling(newImpacts, 100);
    return output;
  }

  getHabitatEffects(habitats: Habitat[]): Impacts {
    // setup some variable to hold values for the whole landscape
    let landscapeCropPollinationProduction : number[] = [];
    let landscapeEconomicValueChain : number[] = [];
    let landscapeWildPlantPollination : number[] = [];
    let landscapeAestheticValues : number[] = [];
    // do something with all our habitats
    habitats.forEach((habitat : Habitat) => {
      // setup some variables to hold possible values specific to each habitat
      let cropPollinationProduction : number[] = [];
      let economicValueChain : number[] = [];
      let wildPlantPollination : number[] = [];
      let aestheticValues : number[] = [];
      //cropPollinationProduction.push(1);
      // what is the logic here.
      // foreach habitat type we have 3 states that differentially effect impacts
      // we need to get the distribution values for each state habitat combination
      if(habitat.type.active == "Semi-natural"){
        // there are some impacts which are not affected by habitat state
        // we only have values for wildPlantPollination and aestheticValues
        //var impactNames : string[] = ["wildPlantPollination", "aestheticValues"];
        //console.log(this.getAllStateEffectValues(habitat, impactNames));
        wildPlantPollination.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "wildPollinators", habitat.state!.wildPollinators!, "wildPlantPollination").values
        ));
        wildPlantPollination.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "floralResources", habitat.state!.floralResources!, "wildPlantPollination").values
        ));
        wildPlantPollination.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "habitatResources", habitat.state!.habitatResources!, "wildPlantPollination").values
        ));

        aestheticValues.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "wildPollinators", habitat.state!.wildPollinators!, "aestheticValues").values
        ));
        aestheticValues.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "floralResources", habitat.state!.floralResources!, "aestheticValues").values
        ));
        aestheticValues.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "habitatResources", habitat.state!.habitatResources!, "aestheticValues").values
        ));

        //console.log("Habitat wildPlantPollination", habitat.id, wildPlantPollination);
        let maxEffect : number = 6.25;
        landscapeWildPlantPollination.push(Math.round((Math.round(Math.mean(wildPlantPollination)) * 2 / 10) * maxEffect, 2));
        landscapeAestheticValues.push(Math.round((Math.round(Math.mean(aestheticValues)) * 2 / 10) * maxEffect, 2));
      } else {
        // habitat state effects all impacts
        //var impactNames : string[] = ["cropPollinationProduction", "economicValueChain", "wildPlantPollination", "aestheticValues"];
        
        wildPlantPollination.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "wildPollinators", habitat.state!.wildPollinators!, "wildPlantPollination").values
        ));
        wildPlantPollination.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "floralResources", habitat.state!.floralResources!, "wildPlantPollination").values
        ));
        wildPlantPollination.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "habitatResources", habitat.state!.habitatResources!, "wildPlantPollination").values
        ));

        aestheticValues.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "wildPollinators", habitat.state!.wildPollinators!, "aestheticValues").values
        ));
        aestheticValues.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "floralResources", habitat.state!.floralResources!, "aestheticValues").values
        ));
        aestheticValues.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "habitatResources", habitat.state!.habitatResources!, "aestheticValues").values
        ));

        cropPollinationProduction.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "wildPollinators", habitat.state!.wildPollinators!, "cropPollinationProduction").values
        ));
        cropPollinationProduction.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "floralResources", habitat.state!.floralResources!, "cropPollinationProduction").values
        ));
        cropPollinationProduction.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "habitatResources", habitat.state!.habitatResources!, "cropPollinationProduction").values
        ));

        economicValueChain.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "wildPollinators", habitat.state!.wildPollinators!, "economicValueChain").values
        ));
        economicValueChain.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "floralResources", habitat.state!.floralResources!, "economicValueChain").values
        ));
        economicValueChain.push(this.habitatService.sample(
          this.getStateEffectOnImpactValues(habitat.type.active, "habitatResources", habitat.state!.habitatResources!, "economicValueChain").values
        ));

        //console.log("Habitat wildPlantPollination", habitat.id, wildPlantPollination);
        let maxEffect : number = Math.round(100/16, 3);
        let maxEffect2 : number = Math.round(100/11, 3);
        landscapeWildPlantPollination.push(Math.round((Math.round(Math.mean(wildPlantPollination)) * 2 / 10) * maxEffect, 2));
        landscapeAestheticValues.push(Math.round((Math.round(Math.mean(aestheticValues)) * 2 / 10) * maxEffect, 2));
        landscapeCropPollinationProduction.push(Math.round((Math.round(Math.mean(cropPollinationProduction)) * 2 / 10) * maxEffect2, 2));
        landscapeEconomicValueChain.push(Math.round((Math.round(Math.mean(economicValueChain)) * 2 / 10) * maxEffect2, 2));
      }
      
      // then do something with those values within each habitat instead??
      //let meanCropPollinationProduction : number = Math.mean(cropPollinationProduction);
      // we want max impact to be 100 and we have 16 habitats in total.
      // 100/16 = 6.25, so each habitat should be able to contribute 6.25 max
      // 100/14 = 7.14
      // each habitat has 3 states that can have a maximum effect on impact drawn of 5.
      // 6.25/3 = 2.083, so 5 need to equal 100% of 2.083
      //let maxEffect : number = 2.083;
      // 5 * 2 / 10 = 1, 4 * 2 / 10 = 0.8
      //(meanCropPollinationProduction * 2 / 10 + 1) * 2.083

    });
    //console.log("Landscape wildPlantPollination", landscapeWildPlantPollination);
    // then setup the output variable
    let effects : Impacts = this.getStartingImpacts();
    // and do something with our possible values to return a single effect number for each impact
    effects.cropPollinationProduction = Math.round(Math.sum(landscapeCropPollinationProduction));
    effects.economicValueChain = Math.round(Math.sum(landscapeEconomicValueChain));
    effects.wildPlantPollination = Math.round(Math.sum(landscapeWildPlantPollination));
    effects.aestheticValues = Math.round(Math.sum(landscapeAestheticValues));
    //effects.cropPollinationProduction = this.habitatService.sample(cropPollinationProduction);
    return effects;
  }

  // Ensures all values expected by type Impacts cannot go above the specified ceiling (value)
  checkImpactsCeiling(impacts: Impacts, value: number): Impacts {
    if(impacts.cropPollinationProduction > value){
      impacts.cropPollinationProduction = value;
    }
    if(impacts.economicValueChain > value){
      impacts.economicValueChain = value;
    }
    if(impacts.wildPlantPollination > value){
      impacts.wildPlantPollination = value;
    }
    if(impacts.aestheticValues > value){
      impacts.aestheticValues = value;
    }
    return impacts;
  }

  constructor() {
    // loaded when service is injected.
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
        this.roundImpacts = this.getImpacts(this.activeRound, habitats);
        console.log("--roundImpacts set by advanceTime in RoundService", this.roundImpacts);
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
