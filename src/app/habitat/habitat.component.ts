import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitat } from '../habitat';
import { HabitatService } from '../habitat.service';
import { HabitatResponseComponent } from '../habitat-response/habitat-response.component';
import { HabitatResponseService } from '../habitat-response.service';
import { ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
//import { MatButtonModule } from '@angular/material/button';
//import { MatDialog, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
//import { NgIconComponent, provideIcons } from '@ng-icons/core';
//import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-habitat',
  standalone: true,
  imports: [CommonModule, HabitatResponseComponent, MatProgressBarModule],
  //providers: [provideIcons({ heroCheckCircleSolid })],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.scss'
})
export class HabitatComponent implements OnInit {
  habitatResponseService: HabitatResponseService = inject(HabitatResponseService);
  habitatService: HabitatService = inject(HabitatService);
  @Input() habitat!: Habitat;

  mode: ProgressBarMode = 'determinate';
  //value: number = 0;
  bufferValue: number = 0;
  
  constructor(){}
  
  ngOnInit(): void {
    // calculate the overall state value for every habitat loaded
    // this.habitat.stateValue = this.habitatService.calculateHabitatStateValue([this.habitat.state!.wildPollinators!, this.habitat.state!.floralResources!, this.habitat.state!.habitatResources!]);
    //console.log('Responses: ', this.habitat.response)
  }

  // might do custom mouseover and mouseleave events to show helper info.
  // could change this for angular material tooltips
  // need to compare options.
  showLabel(habitat_id: number, element_id: string):void {
    console.log("HabitatComponent.showLabel", habitat_id, element_id);
    //let button = <HTMLButtonElement>document.getElementById('buttonSubmitGlobalChanges');
    let habitat = document.getElementById("habitat_"+habitat_id);
    //let label = habitat?.children.  (element_id);
  }

  hideLabel(habitat_id: number, element_id: string):void {
    console.log("HabitatComponent.showLabel", habitat_id, element_id);
  }
}