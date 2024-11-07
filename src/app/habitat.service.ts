import { Injectable } from '@angular/core';
import { Habitat } from './habitat';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  //url = 'http://localhost:3000/habitats';
  //url = 'http://localhost:3000/rounds?id=0';
  habitatList: Habitat[] = [];
  //habitatGlobalUpdateList: Habitat[] = [];
  //habitatLocalUpdateList: Habitat[] = [];

  //These functions use asynchronous code to make a GET request over HTTP using fetch. 
  //For more advanced use cases consider using HttpClient provided by Angular.
  //async getAllHabitats(): Promise<Habitat[]> {
  //  const data = await fetch(this.url);
  //  return (await data.json()) ?? [];
  //}
  //async getHabitatById(id: number): Promise<Habitat | undefined> {
  //  const data = await fetch(`${this.url}/${id}`);
  //  return (await data.json()) ?? {};
  //}
  //async getHabitatByType(type: string): Promise<Habitat | undefined> {
  //  const data = await fetch(`${this.url}/${type}`);
  //  return (await data.json()) ?? {};
  //}

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
