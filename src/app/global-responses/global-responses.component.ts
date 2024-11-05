import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
import { LandscapeComponent } from '../landscape/landscape.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus} from '@ng-icons/heroicons/outline';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-responses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, LandscapeComponent],
  providers: [provideIcons({ heroCheckCircleSolid, heroPlus})],
  templateUrl: './global-responses.component.html',
  styleUrl: './global-responses.component.scss'
})
export class GlobalResponsesComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitatService = inject(HabitatService);
  roundService = inject(RoundService);

  globalResponsesForm = new FormGroup({
    globalResponsesSeminatural: new FormControl(''),
    globalResponsesAgricultural: new FormControl(''),
    globalResponsesUrban: new FormControl(''),
  });

  constructor() {

  }
  addGlobalResponse(value: string){
    console.log('triggered addGlobalResponse: ', value);
  }
}
