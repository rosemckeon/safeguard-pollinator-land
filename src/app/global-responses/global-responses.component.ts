import { Component, inject , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
//import { LandscapeComponent } from '../landscape/landscape.component';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { heroArrowUpOnSquare } from '@ng-icons/heroicons/outline';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
//import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@Component({
  selector: 'app-global-responses',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTabsModule, MatSlideToggleModule, MatButtonModule],
  providers: [provideIcons({ heroCheckCircleSolid, heroArrowUpOnSquare})],
  templateUrl: './global-responses.component.html',
  styleUrl: './global-responses.component.scss'
})
export class GlobalResponsesComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitatService = inject(HabitatService);
  roundService = inject(RoundService);
  
  globalResponsesForm = new FormGroup({
    globalSeminaturalRestoration: new FormControl(''),
    globalAgriculturalRestoration: new FormControl(''),
    globalUrbanRestoration: new FormControl(''),

    globalSeminaturalNatProtReg: new FormControl(''),
    globalAgriculturalNatProtReg: new FormControl(''),
    globalUrbanNatProtReg: new FormControl(''),
    
    globalAgriculturalEcoIntensification: new FormControl(''),
    globalUrbanGreening: new FormControl(''),
  });
  
  isGlobalSeminaturalRestorationChecked: boolean = false;
  isGlobalAgriculturalRestorationChecked: boolean = false;
  isGlobalUrbanRestorationChecked: boolean = false;

  isGlobalSeminaturalNatProtRegChecked: boolean = false;
  isGlobalAgriculturalNatProtRegChecked: boolean = false;
  isGlobalUrbanNatProtRegChecked: boolean = false;

  isGlobalUrbanGreeningChecked: boolean = false;
  isGlobalAgriculturalEcoIntensificationChecked: boolean = false;

  restorationLabel = "Recreate/Restore Ecological Zones";
  natureProtectionLabel = "Nature Protection Regulations";
  urbanGreeningLabel = "Urban Greening";
  ecoIntensificationLabel = "Ecological intensification";

  restorationName = "restoration";
  natureProtectionName = "natureProtection";
  urbanGreeningName = "urbanGreening";
  ecoIntensificationName = "ecoIntensification";
  
  constructor() {
    //this.globalResponsesForm.controls.globalSeminaturalRestoration.disabled == true;
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
  
  submitGlobalResponses(globalResponsesForm: FormGroup){
    console.log('GlobalResponsesComponent.submitGlobalResponses', JSON.stringify(globalResponsesForm.value, null, 2));
  }
}
