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

  constructor() {}
  
  advanceTime(to: number){
    console.log('triggered advanceTime from RoundService: ', to);
    // do some clever stuff here with maths etc to update scores?...
    // or only calculate scores from habitats
    this.activeRound = to;
    let globalSeminatural = <HTMLButtonElement>document.getElementById('globalSeminatural');
    globalSeminatural.disabled = true;
    return this.getAllRounds();
  }
}
