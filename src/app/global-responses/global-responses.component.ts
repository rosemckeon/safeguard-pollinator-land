import { ChangeDetectionStrategy, Component, inject , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
import { FormsModule, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroInformationCircleSolid 
} from '@ng-icons/heroicons/solid';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-global-responses',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatTabsModule, 
    MatSlideToggleModule, 
    MatButtonModule,
    NgIconComponent
  ],
  providers: [provideIcons({ heroInformationCircleSolid })],
  templateUrl: './global-responses.component.html',
  styleUrl: './global-responses.component.scss'
})
export class GlobalResponsesComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitatService = inject(HabitatService);
  roundService = inject(RoundService);
  readonly dialog = inject(MatDialog);

  globalResponsesForm: FormGroup;
  
  isGlobalSeminaturalRestorationChecked: boolean;
  isGlobalAgriculturalRestorationChecked: boolean;
  isGlobalUrbanRestorationChecked: boolean;

  isGlobalSeminaturalNatProtRegChecked: boolean;
  isGlobalAgriculturalNatProtRegChecked: boolean;
  isGlobalUrbanNatProtRegChecked: boolean;

  isGlobalUrbanGreeningChecked: boolean;
  isGlobalAgriculturalEcoIntensificationChecked: boolean;
  
  restorationLabel: string = "Recreate/Restore Ecological Zones";
  natureProtectionLabel: string = "Nature Protection Regulations";
  urbanGreeningLabel: string = "Urban Greening";
  ecoIntensificationLabel: string = "Ecological intensification";

  restorationName: string = "restoration";
  natureProtectionName: string = "natureProtection";
  urbanGreeningName: string = "urbanGreening";
  ecoIntensificationName: string = "ecoIntensification";
  
 
  constructor(formBuilder: FormBuilder) {
    //console.log("GlobalResponseComponent constructor scenario", this.roundService.scenario);
    if (this.roundService.scenario == "B") {
      this.isGlobalSeminaturalRestorationChecked = true;
      this.isGlobalAgriculturalRestorationChecked = true;
      this.isGlobalUrbanRestorationChecked = true;
    
      this.isGlobalSeminaturalNatProtRegChecked = true;
      this.isGlobalAgriculturalNatProtRegChecked = true;
      this.isGlobalUrbanNatProtRegChecked = true;
    
      this.isGlobalUrbanGreeningChecked = true;
      this.isGlobalAgriculturalEcoIntensificationChecked = true;
    } else {
      this.isGlobalSeminaturalRestorationChecked = false;
      this.isGlobalAgriculturalRestorationChecked = false;
      this.isGlobalUrbanRestorationChecked = false;
    
      this.isGlobalSeminaturalNatProtRegChecked = false;
      this.isGlobalAgriculturalNatProtRegChecked = false;
      this.isGlobalUrbanNatProtRegChecked = false;
    
      this.isGlobalUrbanGreeningChecked = false;
      this.isGlobalAgriculturalEcoIntensificationChecked = false;
    }
    // now make sure those checked values are honoured by the the formgroup
    // by initialising it all here in the constructor
    this.globalResponsesForm = formBuilder.group({
      globalSeminaturalRestoration: [this.isGlobalSeminaturalRestorationChecked], 
      globalAgriculturalRestoration: [this.isGlobalAgriculturalRestorationChecked], 
      globalUrbanRestoration: [this.isGlobalUrbanRestorationChecked], 

      globalSeminaturalNatProtReg: [this.isGlobalSeminaturalNatProtRegChecked], 
      globalAgriculturalNatProtReg: [this.isGlobalAgriculturalNatProtRegChecked], 
      globalUrbanNatProtReg: [this.isGlobalUrbanNatProtRegChecked], 

      globalAgriculturalEcoIntensification: [this.isGlobalAgriculturalEcoIntensificationChecked], 
      globalUrbanGreening: [this.isGlobalUrbanGreeningChecked], 
    });
    // alternative way -> patchValue ; after the form is initialized and you want to set the values of the slider, you can use patchvalue like so
    // this.globalResponsesForm.patchValue({globalSeminaturalRestoration: true, globalAgriculturalRestoration: false});
  }

  ngOnInit(): void {}

  async toggleChanges($event: MatSlideToggleChange): Promise<void> {
    console.log('GlobalResponsesComponent.toggleChanges', $event.source.ariaLabel, $event.checked);
    switch($event.source.ariaLabel){
      case('globalSeminaturalRestoration'):
        this.habitatService.setGlobalResponseChange('Semi-natural', this.restorationName, $event.checked);
        this.isGlobalSeminaturalRestorationChecked = $event.checked;
        break;
      case('globalAgriculturalRestoration'):
        this.habitatService.setGlobalResponseChange('Agricultural', this.restorationName, $event.checked);
        this.isGlobalAgriculturalRestorationChecked = $event.checked;
        break;
      case('globalUrbanRestoration'):
        this.habitatService.setGlobalResponseChange('Urban', this.restorationName, $event.checked);
        this.isGlobalUrbanRestorationChecked = $event.checked;
        break;
      case('globalSeminaturalNatProtReg'):
        this.habitatService.setGlobalResponseChange('Semi-natural', this.natureProtectionName, $event.checked);
        this.isGlobalSeminaturalNatProtRegChecked = $event.checked;
        break;
      case('globalAgriculturalNatProtReg'):
        this.habitatService.setGlobalResponseChange('Agricultural', this.natureProtectionName, $event.checked);
        this.isGlobalAgriculturalNatProtRegChecked = $event.checked;
        break;
      case('globalUrbanNatProtReg'):
        this.habitatService.setGlobalResponseChange('Urban', this.natureProtectionName, $event.checked);
        this.isGlobalUrbanNatProtRegChecked = $event.checked;
        break;
      case('globalUrbanGreening'):
        this.habitatService.setGlobalResponseChange('Urban', this.urbanGreeningName, $event.checked);
        this.isGlobalUrbanGreeningChecked = $event.checked;
        break;
      case('globalAgriculturalEcoIntensification'):
        this.habitatService.setGlobalResponseChange('Agricultural', this.ecoIntensificationName, $event.checked);
        this.isGlobalAgriculturalEcoIntensificationChecked = $event.checked;
        break;
      default:
        console.log('Warning: change triggered but no target found.')
    }
  }

  openInfo(value: string):void {
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
  
  submitGlobalResponses(globalResponsesForm: FormGroup){
    console.log('GlobalResponsesComponent.submitGlobalResponses', JSON.stringify(globalResponsesForm.value, null, 2));
  }
}


@Component({
  selector: 'restoration',
  templateUrl: './global-responses.component.restoration.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Restoration {}

@Component({
  selector: 'nat-prot-reg',
  templateUrl: './global-responses.component.nat-prot-reg.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NatProtReg {}

@Component({
  selector: 'eco-intensification',
  templateUrl: './global-responses.component.eco-intensification.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcoIntensification {}

@Component({
  selector: 'urban-greening',
  templateUrl: './global-responses.component.urban-greening.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrbanGreening {}