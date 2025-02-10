// @angular
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'; // also setup in app.config.ts
// interfaces
import { Round } from './round';
import { Habitat } from './habitat';
import { PlayedGame } from './played-game';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {
  private readonly localService: LocalService = inject(LocalService);

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
    this.api_url = "https://api.rosemckeon.uk/elo2024/";
  }
  

  // By wrapping the localService functions we can specify type for specific keys
  // Might be good to move all the service variables to localStorage.
  // probably more efficient
  saveScenario(value: string){
    // we could also do checks on the value here
    this.localService.set("scenario", value);
  }
  getScenario(): string | null {
    return this.localService.get<string>('scenario');
  }

  saveDataCode(value: string | null){
    this.localService.set("dataCode", value);
  }
  getDataCode(){
    return this.localService.get<string>('dataCode');
  }

  saveRoundList(value: Round[]){
    this.localService.set("roundList", value);
  }
  getRoundList(): string | null {
    return this.localService.get<string>('roundList');
  }

  saveLandscape(value: Habitat[]) {
    this.localService.set("landscape", value);
  }
  getLandscape(): string | null {
    return this.localService.get<string>('landscape');
  }

  saveLocalResponses(value: Habitat[]) {
    this.localService.set("localResponses", value);
  }
  getLocalResponses(): Habitat[] | null {
    return this.localService.get<Habitat[]>('localResponses');
  }

  savePlayerData(scenario: string, dataCode: string, playerData: Round[]): any { 
    //console.log("Saving player data", scenario, dataCode, playerData); 
    // the amount of security this adds is a bit rubbish given that these scripts are publicly available
    // upgrade to use JWT if possible
    let token : string = '7TqZhxlrPyRPAKwkU6Ud620TOpuRlI35623RyG68iA5tUyxrINStm5U35NUEcIJyCaP9UOOY0gl1XA677TGElnGJXHU5zRpGR04r';
    let table : string = 'played_games';
    let data : PlayedGame = {
      "scenario": scenario,
      "table": table,
      "token": token,
      "dataCode": dataCode,
      "data": JSON.stringify(playerData)
    }
    let json : string = JSON.stringify(data);
    this.http.post<PlayedGame>(this.api_url, json).subscribe(message => {
      console.log('Updated server:', message);
    });
  }
}
