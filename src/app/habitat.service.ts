// angular
import { Injectable } from '@angular/core';
// Maths - we need this to do proper maths (default only has limited functions)
import * as Math from 'mathjs';
// interfaces
import { Habitat } from './habitat';
// raw data
import responseToStateValues from '../data/response-on-state.json';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  habitatList: Habitat[] = [];

  sample(values: number[] | string[]): any {
    let result : any = values[Math.floor(Math.random()*values.length)];
    console.log('Triggered sample from HabitatService ', result);
    return(result);
  }

  /*
  calculateHabitatStateValue(stateValues: number[]): number {
    console.log('Triggered calculateHabitatStateValue from HabitatService', stateValues);
    //let wildPollinators: number = stateValues[0]; 
    //let floralResources: number = stateValues[1];
    //let habitatResources: number = stateValues[2];
    //let value = Math.round((wildPollinators + floralResources + habitatResources)/3);
    let value = Math.round(stateValues.reduce((partialSum, a) => partialSum + a, 0)/stateValues.length);
    console.log('Value: ', value);
    return(value);
  }
  */

  getStateValues(h: number, r: number, stateName: string): number[] | void {
    console.log('Triggered getStateValues from HabitatService', h, r, stateName);
    let s: number | undefined;
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
        console.log('WARNING: stateName not recognised: ', stateName);
        break;
    }
    if(typeof s != 'undefined'){
      return(responseToStateValues.habitatResponses[h].responseEffects[r].values[s]);
    }
  }

  getResponseEffectOnStateValues(habitatType: string, responseName: string, stateName: string): number[] | void {
    console.log('Triggered getResponseEffectOnStateValues from HabitatService: ', habitatType, responseName, stateName);
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

  setGlobalResponseChange(habitatType: string, responseName: string, value: boolean){
    console.log('Triggered setGlobalResponseChange: ', habitatType, responseName, value);
    // loop through habitats
    for (var i = 0; i < this.habitatList.length; i++) {
      // to match habitatType
      if(this.habitatList[i].type.active == habitatType){
        // loop through responses
        for (var r = 0; r < this.habitatList[i].response!.length; r++){
          // to match responseType
          if(this.habitatList[i].response![r].name == responseName){
            // update response
            console.log('Updating response on habitat: ', this.habitatList[i].id);
            this.habitatList[i].response![r].globalChange = value;
            console.log(this.habitatList[i].response![r]);
          }
        }
        //console.log(this.habitatList[i])
      }
    }
  }

  async applyResponses(habitats: Habitat[]): Promise<Habitat[]>{
    console.log('Triggered applyResponses from HabitatService', habitats);
    // Take globalChange and localChange values and apply 'enabled' properties accordingly.
    // loop through habitats for response settings
    for (var i = 0; i < habitats.length; i++) {
      // then loop through responses
      for (var r = 0; r < habitats[i].response!.length; r++){
        // apple globalChange followed by localChange
        if(habitats[i].response![r].hasOwnProperty('globalChange')){
          habitats[i].response![r].enabled = habitats[i].response![r].globalChange!
          // could reset the values here but i think keeping state will be niceer ot use
        }
        if(habitats[i].response![r].hasOwnProperty('localChange')){
          habitats[i].response![r].enabled = habitats[i].response![r].localChange!
        }
      }
    }
    return(habitats);
  }

  async updateHabitatStates(habitat: Habitat, responseName: string): Promise<Habitat> {
    console.log('Triggered updateHabitatStates:, ', habitat, responseName);
    let stateNames: string[] = ['wildPollinators', 'floralResources', 'habitatResources'];
    let currentStateValues: number[] = [
      habitat.state!.wildPollinators!,
      habitat.state!.floralResources!,
      habitat.state!.habitatResources!
    ];
    let possibleValues: number[] | void;
    let s: number = 0;
    console.log('While: ', stateNames.length);
    while(s <= stateNames.length){
      console.log('s = ', s);
      // check for the final loop being completed
      if(s == stateNames.length){
        // trigger something we can only do with all state iterations complete
        console.log('Looping through states on this habitat is complete.', habitat);
        // assign the calculated overall state score here
        // uses the values updated by the loop.
        /*
        habitat.stateValue = this.calculateHabitatStateValue([
          habitat.state!.wildPollinators!,
          habitat.state!.floralResources!,
          habitat.state!.habitatResources!
        ]);
        */
        break;
      } else {
        // do things to each state
        // use the multiplyer 'm' on the sampled value and add it to the current score
        // if we wanted we could set m to be different on each state in the switch below.
        // an m of 2 allows a maximum improvement of 10 in a round as the possibleValues range from 0-5
        let m : number = 2;
        possibleValues = this.getResponseEffectOnStateValues(habitat.type.active, responseName, stateNames[s]);
        console.log('Possible values: ', possibleValues);
        let chosenValue : number = this.sample(possibleValues!);
        let newValue : number = ( chosenValue * m ) + currentStateValues[s];
        // adding a switch in here incase we want to do different things to each value...
        switch(s){
          case 0:
            if( newValue > 100 ) {
              habitat.state!.wildPollinators = 100;
            } else {
              habitat.state!.wildPollinators = newValue;
            }
            break;
          case 1:
            if( newValue > 100 ) {
              habitat.state!.floralResources = 100;
            } else {
              habitat.state!.floralResources = newValue;
            }
            break;
          case 2:
            if( newValue > 100 ) {
              habitat.state!.habitatResources = 100;
            } else {
              habitat.state!.habitatResources = newValue;
            }
            break;
          default:
            console.log('Warning: state not recognised.');
            // do nothing
            break;
        }
        s++;
      }
    }
    return(habitat); 
  }

  async updateStates(habitats: Habitat[]): Promise<Habitat[]> {
    console.log('Triggered updateStates from HabitatService', habitats);
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
        habitats[i].state!.floralResources!,
        habitats[i].state!.habitatResources!
      ];
      //newStateValues = currentStateValues;
      for (var r = 0; r < habitats[i].response!.length; r++){
        responseName = habitats[i].response![r].name;
        // Only make adjustments for enabled responses
        if(habitats[i].response![r].enabled == true){
          console.log('Enabled: ', responseName, currentStateValues);
          // think about the order this all happen in. 
          // we probably need to do somehting with current and new value processing to make sure responses amplify each other or something
          // leaving it like this for now
          // for each enabled response on each habitat square...
          // I want to run this function and THEN calculate the new stateValue for said habitat
          this.updateHabitatStates(habitats[i], responseName).then((habitat: Habitat) => {
              console.log('Completed updateHabitatStates: ', habitats[i], habitat);
              /*
              let newStateValues : number[] = [
                habitat.state!.wildPollinators!,
                habitat.state!.floralResources!,
                habitat.state!.habitatResources!
              ];
              habitat.stateValue = this.calculateHabitatStateValue(newStateValues);
              habitats[i] = habitat;
              console.log('States updated: ', habitats[i]);
              */
          });
        }
      }
    }
    return(habitats);
  }

  makeGlobalHabitatChanges(globalSeminatural: string, globalAgricultural: string, globalUrban: string) {
    console.log('triggered makeGlobalHabitatChanges');
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
    console.log(this.habitatList);
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
  
  getActiveHabitatTypes(habitats: Habitat[]){
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
  
  constructor() {
    this.getActiveHabitatTypes(this.habitatList);
  }

  submitGlobalChanges(globalSeminatural: string, globalAgricultural: string, globalUrban: string) {
    console.log(`triggered submitGlobalChanges`);
    if(globalSeminatural != ""){
      console.log(`Semi-natural: ${globalSeminatural}`);
    }
    if(globalAgricultural != ""){
      console.log(`Agricultural: ${globalAgricultural}`);
    }
    if(globalUrban != ""){
      console.log(`Urban: ${globalUrban}`);
    }
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
