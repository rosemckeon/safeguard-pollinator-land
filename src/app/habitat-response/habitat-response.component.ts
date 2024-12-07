// @angular
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
// @angular material
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
// interfaces
import { HabitatResponse } from '../habitat-response';
// services
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
// components
import { Restoration, NatProtReg, EcoIntensification, UrbanGreening } from '../global-responses/global-responses.component';

@Component({
  selector: 'app-habitat-response',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatTooltipModule,
    MatSlideToggleModule
  ],
  templateUrl: './habitat-response.component.html',
  styleUrl: './habitat-response.component.scss'
})
export class HabitatResponseComponent implements OnInit {
  habitatService = inject(HabitatService);
  roundService = inject(RoundService);
  readonly dialog = inject(MatDialog);
  @Input() habitatResponse!: HabitatResponse;
  @Input() habitatID!: number;
  @ViewChild(Restoration) restoration?: Restoration;
  @ViewChild(NatProtReg) natProtReg?: NatProtReg;
  @ViewChild(EcoIntensification) ecoIntensification?: EcoIntensification;
  @ViewChild(UrbanGreening) urbanGreening?: UrbanGreening;

  restorationLabel: string = "Recreate/Restore Ecological Zones";
  natureProtectionLabel: string = "Nature Protection Regulations";
  urbanGreeningLabel: string = "Urban Greening";
  ecoIntensificationLabel: string = "Ecological intensification";

  restorationName: string = "restoration";
  natureProtectionName: string = "natureProtection";
  urbanGreeningName: string = "urbanGreening";
  ecoIntensificationName: string = "ecoIntensification";

  constructor(){}

  ngOnInit(): void {
    //console.log("habitatRepsonseComponent.ngOnInit habitatResponse", this.habitatID, this.habitatResponse);
  }

  async toggleChanges($event: MatSlideToggleChange): Promise<void> {
    //console.log('HabitatResponseComponent.toggleChanges', $event.source.ariaLabel, $event.checked);
    //this.habitatResponse.localChange = $event.checked;
    switch($event.source.ariaLabel){
      case('localRestoration'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.restorationName, $event.checked);
        break;
      case('localNatProtReg'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.natureProtectionName, $event.checked);
        break;
      case('localGreening'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.urbanGreeningName, $event.checked);
        break;
      case('localEcoIntensification'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.ecoIntensificationName, $event.checked);
        break;
      default:
        console.log('HabitatResponseComponent.toggleChanges response requested not recognised', $event.source.ariaLabel);
    }
  }

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
      //console.log(`Dialog result: ${result}`);
    });
  }
  
}
