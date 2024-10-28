import { Injectable } from '@angular/core';
import { Habitat } from './habitat';

@Injectable({
  providedIn: 'root'
})
export class HabitatService {
  url = 'http://localhost:3000/habitats';
  updateHabitats = false;
  habitatList: Habitat[] = [];
  habitatGlobalUpdateList: Habitat[] = [];
  habitatLocalUpdateList: Habitat[] = [];

  //These functions use asynchronous code to make a GET request over HTTP using fetch. 
  //For more advanced use cases consider using HttpClient provided by Angular.
  async getAllHabitats(): Promise<Habitat[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHabitatById(id: number): Promise<Habitat | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  async getHabitatByType(type: string): Promise<Habitat | undefined> {
    const data = await fetch(`${this.url}/${type}`);
    return (await data.json()) ?? {};
  }

  makeGlobalHabitatChanges(globalSeminatural: string, globalAgricultural: string, globalUrban: string) {
    console.log('triggered makeGlobalHabitatChanges');
    //this.updateHabitats = true;
    //this.habitatGlobalUpdateList = this.habitatList;
    //const data = await fetch(this.url);
  
    for (var i = 0; i < this.habitatGlobalUpdateList.length; i++) {
      if(this.habitatGlobalUpdateList[i].type == 'Semi-natural'){
        if(globalSeminatural != ""){
          this.habitatGlobalUpdateList[i].globalChangeTypeTo = globalSeminatural;
        } 
      }
      else if(this.habitatGlobalUpdateList[i].type == 'Agricultural'){
        if(globalAgricultural != ""){
          this.habitatGlobalUpdateList[i].globalChangeTypeTo = globalAgricultural;
        } 
      }
      else if(this.habitatGlobalUpdateList[i].type == 'Urban'){
        if(globalUrban != ""){
          this.habitatGlobalUpdateList[i].globalChangeTypeTo = globalUrban;
        } 
      }
    }
    console.log(this.habitatGlobalUpdateList);
    //return;
    //return (await data.json()) ?? [];
  }
  constructor() {
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
