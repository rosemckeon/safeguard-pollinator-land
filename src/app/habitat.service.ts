import { Injectable } from '@angular/core';
import { Habitat } from './habitat';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  habitatList: Habitat[] = [];

  setGlobalResponseChange(habitatType: string, responseType: string, value: boolean){
    console.log('Triggered setGlobalResponseChange: ', habitatType, responseType, value);
    // loop through habitats
    for (var i = 0; i < this.habitatList.length; i++) {
      // to match habitatType
      if(this.habitatList[i].type.active == habitatType){
        // loop through responses
        for (var r = 0; r < this.habitatList[i].response!.length; r++){
          // to match responseType
          if(this.habitatList[i].response![r].type == responseType){
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

  applyResponses(habitats: Habitat[]){
    console.log('Triggered applyResponses from HabitatService', habitats);
    // Take globalChange and localChange values and apply 'enabled' properties accordingly.
    // loop through habitats for response settings
    for (var i = 0; i < habitats.length; i++) {
      // then loop through responses
      for (var r = 0; r < this.habitatList[i].response!.length; r++){
        // apple globalChange followed by localChange
        if(this.habitatList[i].response![r].hasOwnProperty('globalChange')){
          this.habitatList[i].response![r].enabled = this.habitatList[i].response![r].globalChange!
          // could reset the values here but i think keeping state will be niceer ot use
        }
        if(this.habitatList[i].response![r].hasOwnProperty('localChange')){
          this.habitatList[i].response![r].enabled = this.habitatList[i].response![r].localChange!
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
