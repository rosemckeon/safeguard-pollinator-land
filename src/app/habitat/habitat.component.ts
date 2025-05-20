import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitat } from '../habitat';
import { HabitatService } from '../habitat.service';
import { HabitatResponseComponent } from '../habitat-response/habitat-response.component';
//import { HabitatResponseService } from '../habitat-response.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-habitat',
  standalone: true,
  imports: [
    CommonModule, 
    HabitatResponseComponent, 
    MatTooltipModule
  ],
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.scss'
})
export class HabitatComponent implements OnInit {
  //habitatResponseService: HabitatResponseService = inject(HabitatResponseService);
  habitatService: HabitatService = inject(HabitatService);
  readonly dialog = inject(MatDialog);
  @Input() habitat!: Habitat;
  
  constructor(){}
  
  ngOnInit(): void {
    // calculate the overall state value for every habitat loaded
    // this.habitat.stateValue = this.habitatService.calculateHabitatStateValue([this.habitat.state!.wildPollinators!, this.habitat.state!.floralResources!, this.habitat.state!.habitatResources!]);
    //console.log('Responses: ', this.habitat.response)
  }

  openInfo(value: string):void {
    let temp: any;
    switch(value){
      case 'wildPollinators':
        temp = this.dialog.open(WildPollinators);
        break;
      //case 'floralResources':
        //temp = this.dialog.open(FloralResources);
        //break;
      case 'habitatResources':
        temp = this.dialog.open(HabitatResources);
        break;
      case 'pestsAndWeeds':
        temp = this.dialog.open(PestsAndWeeds);
        break;
      default:
        console.log("HabitatComponent.openInfo - requested dialogue does not exist", value);
        break;
    }
    const dialogRef = temp;
    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'wild-pollinators',
  templateUrl: './habitat.component.wild-pollinators.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WildPollinators {}

//@Component({
//  selector: 'floral-resources',
//  templateUrl: './habitat.component.floral-resources.html',
//  standalone: true,
//  imports: [MatDialogModule, MatButtonModule],
//  changeDetection: ChangeDetectionStrategy.OnPush,
//})
//export class FloralResources {}

@Component({
  selector: 'HabitatResources',
  templateUrl: './habitat.component.habitat-resources.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitatResources {}

@Component({
  selector: 'PestsAndWeeds',
  templateUrl: './habitat.component.pests-and-weeds.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PestsAndWeeds {}