import { Injectable } from '@angular/core';
import { Round } from './round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  url = 'http://localhost:3000/rounds';
  roundList: Round[] = [];
  roundAdvancedUpdateList: Round[] = [];

  async getAllRounds(): Promise<Round[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getRoundById(value: number): Promise<Round[]> {
    const data = await fetch(`this.url/${value}`);
    return (await data.json()) ?? [];
  }

  //add any functions need to advance time here.
  constructor() { }
  advanceTime(round: number, score: number){
    //do some clever stuff here...
    console.log('triggered advanceTime: ', round, score);
    console.log('Next round: ', round + 1);
  }
}
