import { Component, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatResponse } from '../habitat-response';
import { Restoration, NatProtReg, EcoIntensification, UrbanGreening } from '../global-responses/global-responses.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-habitat-response',
  standalone: true,
  imports: [
    CommonModule, 
    MatTooltipModule
  ],
  templateUrl: './habitat-response.component.html',
  styleUrl: './habitat-response.component.scss'
})
export class HabitatResponseComponent {
  readonly dialog = inject(MatDialog);
  @Input() habitatResponse!: HabitatResponse;
  @ViewChild(Restoration) restoration?: Restoration;
  @ViewChild(NatProtReg) natProtReg?: NatProtReg;
  @ViewChild(EcoIntensification) ecoIntensification?: EcoIntensification;
  @ViewChild(UrbanGreening) urbanGreening?: UrbanGreening;

  constructor(){}

  openInfo(value: string) {
    //console.log("GlobalResponsesComponent.openInfo", value);
    let temp: any;
    switch(value){
      case 'restoration':
        temp = this.dialog.open(Restoration);
        break;
      case 'natProtReg':
        temp = this.dialog.open(NatProtReg);
        break;
      case 'ecoIntensification':
        temp = this.dialog.open(EcoIntensification);
        break;
      case 'urbanGreening':
        temp = this.dialog.open(UrbanGreening);
        break;
      default:
        console.log("GlobalResponsesComponent.openInfo - requested dialogue does not exist", value);
        break;
    }
    const dialogRef = temp;
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
