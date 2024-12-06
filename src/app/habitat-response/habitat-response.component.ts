// @angular
import { Component, inject, Input, ViewChild } from '@angular/core';
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
export class HabitatResponseComponent {
  habitatService = inject(HabitatService);
  roundService = inject(RoundService);
  readonly dialog = inject(MatDialog);
  @Input() habitatResponse!: HabitatResponse;
  @Input() habitatID!: number;
  @ViewChild(Restoration) restoration?: Restoration;
  @ViewChild(NatProtReg) natProtReg?: NatProtReg;
  @ViewChild(EcoIntensification) ecoIntensification?: EcoIntensification;
  @ViewChild(UrbanGreening) urbanGreening?: UrbanGreening;

  localResponsesForm: FormGroup;

  isLocalRestorationChecked: boolean;
  isLocalNatProtRegChecked: boolean;
  isLocalEcoIntensificationChecked: boolean;
  isLocalUrbanGreeningChecked: boolean;

  restorationLabel: string = "Recreate/Restore Ecological Zones";
  natureProtectionLabel: string = "Nature Protection Regulations";
  urbanGreeningLabel: string = "Urban Greening";
  ecoIntensificationLabel: string = "Ecological intensification";

  restorationName: string = "restoration";
  natureProtectionName: string = "natureProtection";
  urbanGreeningName: string = "urbanGreening";
  ecoIntensificationName: string = "ecoIntensification";

  constructor(formBuilder: FormBuilder){
    if (this.roundService.scenario == "B") {
      this.isLocalRestorationChecked = true;
      this.isLocalNatProtRegChecked = true;
      // can i conditionally do these next two depending on the habitat type?
      // can i pass habitat.type.active to this component?
      this.isLocalUrbanGreeningChecked = true;
      this.isLocalEcoIntensificationChecked = true;
    } else {
      this.isLocalRestorationChecked = false;
      this.isLocalNatProtRegChecked = false;
      // see above comment
      this.isLocalUrbanGreeningChecked = false;
      this.isLocalEcoIntensificationChecked = false;
    }

    // now make sure those checked values are honoured by the the formgroup
    // by initialising it all here in the constructor
    this.localResponsesForm = formBuilder.group({
      localRestoration: [this.isLocalRestorationChecked], 
      localNatProtReg: [this.isLocalNatProtRegChecked], 
      localEcoIntensification: [this.isLocalEcoIntensificationChecked], 
      localUrbanGreening: [this.isLocalUrbanGreeningChecked], 
    });
  }

  async toggleChanges($event: MatSlideToggleChange): Promise<void> {
    console.log('HabitatResponseComponent.toggleChanges', $event.source.ariaLabel, $event.checked);
    this.habitatResponse.localChange = $event.checked;
    switch($event.source.ariaLabel){
      case('localRestoration'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.restorationName, $event.checked);
        this.isLocalRestorationChecked = $event.checked;
        break;
      case('localNatProtReg'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.natureProtectionName, $event.checked);
        this.isLocalNatProtRegChecked = $event.checked;
        break;
      case('localGreening'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.urbanGreeningName, $event.checked);
        this.isLocalUrbanGreeningChecked = $event.checked;
        break;
      case('localEcoIntensification'):
        this.habitatService.setLocalResponseChange(this.habitatID, this.ecoIntensificationName, $event.checked);
        this.isLocalEcoIntensificationChecked = $event.checked;
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
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
