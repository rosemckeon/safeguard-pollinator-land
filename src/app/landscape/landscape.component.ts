import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatComponent } from '../habitat/habitat.component'
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landscape',
  standalone: true,
  imports: [CommonModule, HabitatComponent],
  templateUrl: './landscape.component.html',
  styleUrl: './landscape.component.scss'
})
export class LandscapeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitatService: HabitatService = inject(HabitatService);
  roundService: RoundService = inject(RoundService);

  @Input() 
  set scenario(scenario: string){
    console.log('Input scenario set: ', scenario);
    //this.scenario$ = scenario;
    this.roundService.getStartingScenario(scenario);
  }

  constructor() {
    console.log("Scenario in LandscapeComponent Contructor", this.roundService.scenario);
  }
}
