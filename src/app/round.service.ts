import { Injectable } from '@angular/core';

import { Round } from './round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  url = 'http://localhost:3000/rounds';
  activeRound!: number;
  roundList: Round[] = [];
  roundAdvancedUpdateList: Round[] = [];

  async getAllRounds(): Promise<Round[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  // broken function
  //async getRoundById(value: number): Promise<Round[]> {
  //  const data = await fetch(`this.url/?id=${value}`);
  //  return (await data.json()) ?? [];
  //}

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
  resetGlobalControls(): void {
    console.log('triggered resetGlobalControls from GlobalControlsComponent');
    let activeHabitatTypes = this.roundList[this.activeRound].activeHabitatTypes;
    // put these into a loop to be more concise
    let globalSeminatural = <HTMLButtonElement>document.getElementById('globalSeminatural');
    globalSeminatural.value = "";
    //this.GlobalControlComponent.updateGlobalControlClasses(id, this.urbanClasses);
    if(activeHabitatTypes?.['Semi-natural'] == 0){
      globalSeminatural.disabled = true;
    }

    let globalAgricultural = <HTMLButtonElement>document.getElementById('globalAgricultural');
    globalAgricultural.value = "";
    if(activeHabitatTypes?.Agricultural == 0){
      globalAgricultural.disabled = true;
    }

    let globalUrban = <HTMLButtonElement>document.getElementById('globalUrban');
    globalSeminatural.value = "";
    if(activeHabitatTypes?.Urban == 0){
      globalUrban.disabled = true;
    }
  }
  constructor() {}
  advanceTime(to: number){
    console.log('triggered advanceTime from RoundService: ', to);
    // do some clever stuff here with maths etc to update scores?...
    // or only calculate scores from habitats
    this.activeRound = to;
    return this.getAllRounds();
  }
}
