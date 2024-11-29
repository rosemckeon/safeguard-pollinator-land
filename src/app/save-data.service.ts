// @angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; // also setup in app.config.ts
// interfaces
import { Round } from './round';
import { PlayedGame } from './played-game';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  api_url : string;
  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      //  'Access-Control-Allow-Origin': '*',
      }
    )
  };

  constructor(private http: HttpClient) {
    //this.http available here
    this.api_url = "http://api.rosemckeon.uk/elo2024/";
  }
  // and also in any service functions this.http is available 
  
  savePlayerData(scenario: string, playerData: Round[]): any { 
    console.log("Saving player data", scenario, playerData); 
    // the amount of security this adds is a bit rubbish given that these scripts are publicly available
    // upgrade to use JWT if possible
    let token : string = '7TqZhxlrPyRPAKwkU6Ud620TOpuRlI35623RyG68iA5tUyxrINStm5U35NUEcIJyCaP9UOOY0gl1XA677TGElnGJXHU5zRpGR04r';
    let table : string = 'played_games';
    let data : PlayedGame = {
      "scenario": scenario,
      "table": table,
      "token": token,
      "data": JSON.stringify(playerData)
    }
    let json : string = JSON.stringify(data);
    this.http.post<PlayedGame>(this.api_url, json).subscribe(message => {
      console.log('Updated server:', message);
    });
  }
}
