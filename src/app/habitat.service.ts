// angular
import { Injectable, inject } from '@angular/core';
// Maths - we need this to do proper maths (default only has limited functions)
import * as Math from 'mathjs';
// interfaces
import { Habitat } from './habitat';
import { HabitatCount } from './habitat-count';
// services 
import { SaveDataService } from './save-data.service';
// raw data
import responseToStateValues from '../data/response-on-state.json';
import { WildPollinators } from './habitat/habitat.component';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  saveDataService: SaveDataService = inject(SaveDataService);
  habitatList: Habitat[] = [];
  localResponses: Habitat[] = [];

  constructor() {
    //this.getActiveHabitatTypes(this.habitatList);
  }

  sample(values: number[] | string[]): any {
    let result : any = values[Math.floor(Math.random()*values.length)];
    //console.log('Triggered sample from HabitatService ', result);
    return(result);
  }

  getStateValues(h: number, r: number, stateName: string): number[] | void {
    //console.log('habitatServcie.getStateValues', h, r, stateName);
    let s: number | undefined;
    switch(stateName){
      case 'wildPollinators':
        s = 0;
        break;
      //case 'floralResources':
      //  s = 1;
      //  break;
      case 'habitatResources':
        s = 2;
        break;
      case 'pestsAndWeeds':
        s = 1;
        break;
      default:
        console.log('WARNING: stateName not recognised: ', stateName);
        break;
    }
    if(typeof s != 'undefined'){
      return(responseToStateValues.habitatResponses[h].responseEffects[r].values[s]);
    }
  }

  getResponseEffectOnStateValues(habitatType: string, responseName: string, stateName: string): number[] | void {
    //console.log('habitatService.getResponseEffectOnStateValues', habitatType, responseName, stateName);
    let h : number | undefined;
    let r : number | undefined;
    let result : number[] | void;
    switch(habitatType){
      case 'Semi-natural':
        h = 1;
        switch(responseName){
          case 'restoration':
            r = 0;
            break;
          case 'natureProtection':
            r = 1;
            break;
          default:
            console.log('WARNING: responseName not recognised.', responseName);
            break;
        }
        break;
      case 'Agricultural':
        h = 0;
        switch(responseName){
          case 'restoration':
            r = 0;
            break;
          case 'natureProtection':
            r = 2;
            break;
          case 'ecoIntensification':
            r = 1;
            break;
          default:
            console.log('WARNING: responseName not recognised.', responseName);
            break;
        }
        break;
      case 'Urban':
        h = 2;
        switch(responseName){
          case 'restoration':
            r = 0;
            break;
          case 'natureProtection':
            r = 1;
            break;
          case 'urbanGreening':
            r = 2;
            break;
          default:
            console.log('WARNING: responseName not recognised.', responseName);
            break;
        }
        break;
      default:
        console.log('WARNING: HabitatType not recognised.', habitatType);
        break;
    }
    if(typeof h != 'undefined' && typeof r != 'undefined'){
      result = this.getStateValues(h!, r!, stateName);
      return(result);
    } 
  }

  async setLocalResponseChange(habitatID: number, responseName: string, value: boolean): Promise<void>{
    //let habitats = this.saveDataService.getGlobalResponses();
    // this.habitatList has the globalChange value we need wheras habitats has the raw loaded state.
    // if we comment out the loop below, this.habitatList is the same as habitats.
    // loop through habitats
    
    for (var i = 0; i < this.localResponses?.length; i++) {
      // to match ID
      if(this.localResponses[i].id == habitatID){
        // loop through responses
        for (var r = 0; r < this.localResponses[i].response!.length; r++){
          // to match responseType
          if(this.localResponses[i].response![r].name == responseName){
            // update response
            //console.log('Updating response on habitat: ', this.habitatList[i].id);
            this.localResponses[i].response![r].localChange = value;
            //console.log(this.habitatList[i].response![r]);
          }
        }
        //console.log(this.habitatList[i])
      }
    }
    //console.log('habitatService.setLocalResponseChange: ', habitatID, responseName, value, this.localResponses);
    this.saveDataService.saveLocalResponses(this.localResponses);
  }
  
  // triggered by the GlobalResponseComponent when a global descision is made.
  async setResponseChangeByType(habitatType: string, responseName: string, value: boolean): Promise<void> {
    //console.log("HabitatService.setResponseChangeByType", habitatType, responseName, value);
    let local: boolean = false;
    let habitatList = this.localResponses;
    // loop through habitats
    for (var i = 0; i < habitatList!.length; i++) {
      // to match habitatType
      if(habitatList[i].type.active == habitatType){
        // loop through responses
        for (var r = 0; r < habitatList[i].response!.length; r++){
          // to match responseType
          if(habitatList[i].response![r].name == responseName){
            // update response
            habitatList[i].response![r].localChange = value;
          }
        }
      }
    }
    this.localResponses = habitatList;
    this.saveDataService.saveLocalResponses(habitatList);
    
    //console.log("HabitatService.setResponseChangeByType completed", habitatList);
  }

  getScore(min: number, max: number, currentValue: number, expertScore: number, m: number, decrease: boolean): number {
    // in a range min to max (eg: 0-100), 80 becomes 20, 40 becomes 60, 90 becomes 10.
    let inverseCurrentValue : number = max - currentValue + min;
    // if the real current score is over 70 the inverse will be under 30.
    // we reduce that to 5 so that habitat improvement gets harder
    if(inverseCurrentValue <= 30){ inverseCurrentValue = 5}
    // and we do similar at the bottom range so there is a noticible large increase when repsonses are made in shit starting conditions.
    else if(inverseCurrentValue >= 80){ inverseCurrentValue = 100 }
    // adjust the usual score with the inverse percentage. 
    let score : number = (m * expertScore) * (inverseCurrentValue/100);
    let newValue : number;
    if(decrease){
      newValue = Math.round(currentValue - score);
    } else {
      newValue = Math.round(currentValue + score);
    }
    //console.log("habitatService.getScore", currentValue, inverseCurrentValue, expertScore, m, (m*expertScore), score, newValue);
    if( newValue > 100 ) {
      return 100;
    } else if ( newValue < 0 ) {
      return 0;
    } else {
      return newValue;
    }
  }

  async increaseHabitatStates(habitat: Habitat, responseName: string): Promise<Habitat> {
    //console.log('habitatService.updateHabitatStates:, ', habitat, responseName);
    //let stateNames: string[] = ['wildPollinators', 'floralResources', 'habitatResources'];
    let stateNames: string[] = ['wildPollinators', 'habitatResources', 'pestsAndWeeds'];
    let currentStateValues: number[] = [
      habitat.state!.wildPollinators!,
      //habitat.state!.floralResources!,
      habitat.state!.habitatResources!,
      habitat.state!.pestsAndWeeds!
    ];
    let possibleValues: number[] | void;
    let s: number = 0;
    //console.log('While: ', stateNames.length);
    while(s <= stateNames.length){
      //console.log('s = ', s);
      // check for the final loop being completed
      if(s == stateNames.length){
        // trigger something we can only do with all state iterations complete
        // We will force the WP score to be tightly linked with floral resources.
        habitat.state!.wildPollinators = Math.round(Math.mean(currentStateValues[0], currentStateValues[1]));
        //habitat.state!.floralResources = currentStateValues[1];
        habitat.state!.habitatResources = currentStateValues[2];
        habitat.state!.pestsAndWeeds = currentStateValues[4];
        //console.log('habitatService.updateHabitatStates Loop complete', habitat.state);
        break;
      } else {
        // do things to each state
        // m * 5 = max improvement possible for a given response.
        let m: number = 0 ;
        switch(responseName){
          case 'restoration':
            m = 4;
            break;
          case 'natureProtection':
            m = 4;
            break;
          case 'ecoIntensification':
            m = 3;
            break;
          case 'urbanGreening':
            m = 3;
            break;
          default:
            console.log("habitatService.updateHabitatStates responseName not recognized", responseName);
            break;
        }
        if(m > 0){
          possibleValues = this.getResponseEffectOnStateValues(habitat.type.active, responseName, stateNames[s]);
          // console.log('Possible values: ', possibleValues);
          let chosenValue : number = this.sample(possibleValues!);
          // make m bigger/smaller in some situations because this effect is known to be very important.
          if(responseName == "restoration" && habitat.type.active == "Semi-natural"){
            m = m * 1.3
          } else if (responseName == "natureProtection" && habitat.type.active == "Semi-natural"){
            m = m * 1.2
          } else if (responseName == "restoration" && habitat.type.active != "Semi-natural"){
            m = m * 0.5
          } else if (responseName == "natureProtection" && habitat.type.active != "Semi-natural"){
            m = m * 0.5
          }
          let newValue : number = this.getScore(0, 100, currentStateValues[s], chosenValue, m, false); 
          //update the currentStateValue
          currentStateValues[s] = newValue;
        } else {
          console.log("Something went wrong.");
          break;
        }
        s++;
      }
    }
    return(habitat); 
  }


  async decreaseHabitatStates(habitat: Habitat, responseName: string): Promise<Habitat> {
    //console.log('habitatService.updateHabitatStates:, ', habitat, responseName);
    let stateNames: string[] = ['wildPollinators', 'floralResources', 'habitatResources'];
    let currentStateValues: number[] = [
      habitat.state!.wildPollinators!,
      //habitat.state!.floralResources!,
      habitat.state!.habitatResources!,
      habitat.state!.pestsAndWeeds!
    ];
    let possibleValues: number[] | void;
    let s: number = 0;
    //console.log('While: ', stateNames.length);
    while(s <= stateNames.length){
      //console.log('s = ', s);
      // check for the final loop being completed
      if(s == stateNames.length){
        // trigger something we can only do with all state iterations complete
        // We will force the WP score to be tightly linked with floral resources.
        habitat.state!.wildPollinators = Math.round(Math.mean(currentStateValues[0], currentStateValues[1]));
        //habitat.state!.floralResources = currentStateValues[1];
        habitat.state!.habitatResources = currentStateValues[2];
        habitat.state!.pestsAndWeeds = currentStateValues[4];
        //console.log('habitatService.updateHabitatStates Loop complete', habitat.state);
        break;
      } else {
        // do things to each state
        // m * 5 = max improvement possible for a given response.
        let m: number = 0 ;
        switch(responseName){
          case 'restoration':
            m = 2;
            break;
          case 'natureProtection':
            m = 2;
            break;
          case 'ecoIntensification':
            m = 1;
            break;
          case 'urbanGreening':
            m = 1;
            break;
          default:
            console.log("habitatService.updateHabitatStates responseName not recognized", responseName);
            break;
        }
        if(m > 0){
          possibleValues = this.getResponseEffectOnStateValues(habitat.type.active, responseName, stateNames[s]);
          // console.log('Possible values: ', possibleValues);
          let chosenValue : number = this.sample(possibleValues!);
          // make m bigger/smaller in some situations because this effect is known to be very important.
          if(responseName == "restoration" && habitat.type.active == "Semi-natural"){
            m = m * 1.3
          } else if (responseName == "natureProtection" && habitat.type.active == "Semi-natural"){
            m = m * 1.2
          } else if (responseName == "restoration" && habitat.type.active != "Semi-natural"){
            m = m * 0.5
          } else if (responseName == "natureProtection" && habitat.type.active != "Semi-natural"){
            m = m * 0.5
          }
          let newValue : number = this.getScore(0, 100, currentStateValues[s], chosenValue, m, true); 
          //update the currentStateValue
          if(s == 2){
            // reduce the reduction for habitat resources as we can make less assumptions here.
            currentStateValues[s] = Math.round(Math.mean(currentStateValues[s], newValue));
          } else {
            currentStateValues[s] = newValue;
          }
          
        } else {
          console.log("Something went wrong.");
          break;
        }
        s++;
      }
    }
    return(habitat); 
  }

  updateStates(habitats: Habitat[]): Habitat[] {
    //console.log('Triggered updateStates from HabitatService', habitats);
    let habitatType: string;
    let responseName: string;
    let currentStateValues: number[];
    //let newStateValues: number[];
    //let possibleValues: number[] | void;
    // loop again and work out new state values for every habitat
    for (var i = 0; i < habitats.length; i++) {
      habitatType = habitats[i].type.active;
      currentStateValues = [
        habitats[i].state!.wildPollinators!,
        //habitats[i].state!.floralResources!,
        habitats[i].state!.habitatResources!,
        habitats[i].state!.pestsAndWeeds!
      ];
      //newStateValues = currentStateValues;
      for (var r = 0; r < habitats[i].response!.length; r++){
        responseName = habitats[i].response![r].name;
        // Only make adjustments for enabled responses
        if(habitats[i].response![r].enabled == true){
          this.increaseHabitatStates(habitats[i], responseName);
        } else {
          this.decreaseHabitatStates(habitats[i], responseName);
        }
      }
    }
    return(habitats);
  }

  makeGlobalHabitatChanges(globalSeminatural: string, globalAgricultural: string, globalUrban: string) {
    //console.log('triggered makeGlobalHabitatChanges');
    //this.updateHabitats = true;
    //this.habitatGlobalUpdateList = this.habitatList;
    //const data = await fetch(this.url);
  
    for (var i = 0; i < this.habitatList.length; i++) {
      if(this.habitatList[i].type.active == 'Semi-natural'){
        if(globalSeminatural != ""){
          this.habitatList[i].type.globalChange = globalSeminatural;
        } 
      }
      else if(this.habitatList[i].type.active == 'Agricultural'){
        if(globalAgricultural != ""){
          this.habitatList[i].type.globalChange = globalAgricultural;
        } 
      }
      else if(this.habitatList[i].type.active == 'Urban'){
        if(globalUrban != ""){
          this.habitatList[i].type.globalChange = globalUrban;
        } 
      }
    }
    // console.log(this.habitatList);
    //return;
    //return (await data.json()) ?? [];
  }

  applyGlobalHabitatChanges(habitats: Habitat[]){
    //console.log(habitats);
    // need to return updated habitat array and apply said array to this.habtaList and other default habitat lists ready for this rounds new changes.
    for (var i = 0; i < habitats.length; i++) {
      if(habitats[i].type.globalChange != ''){
        habitats[i].type.active = habitats[i].type.globalChange!;
        habitats[i].type.globalChange = '';
      }
    }
    this.habitatList = habitats;
    return habitats;
  }
  
  async getActiveHabitatTypes(habitats: Habitat[]): Promise<HabitatCount> {
    // is there a better way to count things that doesn't use loops?
    let N_seminatural = 0;
    let N_agricultural = 0;
    let N_urban = 0;
    for (var i = 0; i < habitats.length; i++){
      if(this.habitatList[i].type.active == 'Semi-natural'){
        N_seminatural++;
      }
      else if(this.habitatList[i].type.active == 'Agricultural'){
        N_agricultural++
      }
      else if(this.habitatList[i].type.active == 'Urban'){
        N_urban++
      }
    }
    return {
      "Semi-natural": N_seminatural,
      "Agricultural": N_agricultural,
      "Urban": N_urban,
    }
  }

  submitGlobalChanges(globalSeminatural: string, globalAgricultural: string, globalUrban: string) {
    //console.log(`triggered submitGlobalChanges`);
    /*
    if(globalSeminatural != ""){
      console.log(`Semi-natural: ${globalSeminatural}`);
    }
    if(globalAgricultural != ""){
      console.log(`Agricultural: ${globalAgricultural}`);
    }
    if(globalUrban != ""){
      console.log(`Urban: ${globalUrban}`);
    }
    */
    // Make interface changes
    let button = <HTMLButtonElement>document.getElementById('buttonSubmitGlobalChanges');
    let checkCircle = document.getElementById("heroCheckCircleSolid");
    checkCircle?.setAttribute('class', 'visible text-indigo-700 text-2xl');
    button.disabled = true;
    // Update habitats
    this.makeGlobalHabitatChanges(globalSeminatural, globalAgricultural, globalUrban);
    //return "Something...";
  }
}
