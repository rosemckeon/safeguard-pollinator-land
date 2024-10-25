import { Injectable } from '@angular/core';
import { Habitat } from './habitat';

@Injectable({
  providedIn: 'root'
})
export class GlobalChangesService {
  url = 'http://localhost:3000/habitats';
  async getAllHabitats(): Promise<Habitat[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
  async getHabitatById(id: number): Promise<Habitat | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  async getHabitatByType(type: string): Promise<Habitat | undefined> {
    const data = await fetch(`$this.url}/${type}`);
    return (await data.json()) ?? {};
  }
  constructor() { }
  submitGlobalChanges(globalSeminaturalChange: string, globalAgriculturalChange: string, globalUrbanChange: string) {
    console.log(
      `Global descisions made: Semi-natural land will become: ${globalSeminaturalChange}, Agricultural land will become: ${globalAgriculturalChange}, Urban land will become: ${globalUrbanChange}.`,
    );
    const global_controls = document.getElementById("global_controls");
    
  }
}
