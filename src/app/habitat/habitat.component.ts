import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitat } from '../habitat';
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
  @Input() habitat!: Habitat;

  mode: ProgressBarMode = 'determinate';
  value: number = 0;
  bufferValue: number = 75;
  
  calculateValue(wildPollinators: number, floralResources: number, habitatResources: number): void {
    console.log('Triggered calculateValue from HabitatComponent', wildPollinators, floralResources, habitatResources);
    this.value = Math.round((wildPollinators + floralResources + habitatResources)/3);
    console.log('Value: ', this.value);
  }

  constructor(){}
  
  ngOnInit(): void {
    //console.log(this.habitat);
    this.calculateValue(this.habitat.state!.wildPollinators!, this.habitat.state!.floralResources!, this.habitat.state!.habitatResources!);
    //console.log('Responses: ', this.habitat.response)
  }
}