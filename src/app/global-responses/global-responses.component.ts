import { Component, inject , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
import { LandscapeComponent } from '../landscape/landscape.component';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIconComponent, LandscapeComponent, MatTabsModule, MatSlideToggleModule, MatButtonModule],
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
    globalAgriculturalFarmingSys: new FormControl(''),
    globalAgriculturalIPM: new FormControl(''),
    globalUrbanRestoration: new FormControl(''),
    globalUrbanIPM: new FormControl(''),
  });
  
  isGlobalSeminaturalRestorationChecked: boolean = false;
  isGlobalAgriculturalRestorationChecked: boolean = false;
  isGlobalAgriculturalFarmingSysChecked: boolean = false;
  isGlobalAgriculturalIPMChecked: boolean = false;
  isGlobalUrbanRestorationChecked: boolean = false;
  isGlobalUrbanIPMChecked: boolean = false;

  //toggleEvents: string[] = [];

  /*
  alertFormValues(globalResponsesForm: FormGroup) {
    alert(JSON.stringify(globalResponsesForm.value, null, 2));
  }
  */

  onGlobalResponseChange(value:string, id:string): void {
    console.log('triggered onGlobalResponseChange from GlobalResponsesComponent', id, value);
    /*
		if(value == 'Semi-natural'){
      this.updateGlobalControlClasses(id, this.seminaturalClasses);
    } else if(value == 'Agricultural'){
      this.updateGlobalControlClasses(id, this.agriculturalClasses);
    } else if(value == 'Urban'){
      this.updateGlobalControlClasses(id, this.urbanClasses);
    }
    let button = <HTMLButtonElement>document.getElementById('buttonSubmitGlobalChanges');
    let checkCircle = document.getElementById("heroCheckCircleSolid");
    checkCircle?.setAttribute('class', 'invisible');
    button.disabled = false;
    */
	}

  constructor() {
    //this.globalResponsesForm.controls.globalSeminaturalRestoration.disabled == true;
  }

  ngOnInit(): void {}

  toggleChanges($event: MatSlideToggleChange) {
    console.log('Triggered toggleChanges from GlobalResponsesComponent')
    console.log($event.source.ariaLabel, $event.checked);
    switch($event.source.ariaLabel){
      case('globalSeminaturalRestoration'):
        this.habitatService.setGlobalResponseChange('Semi-natural', 'Ecological Restoration', $event.checked);
        this.isGlobalSeminaturalRestorationChecked = $event.checked;
        break;
      case('globalAgriculturalRestoration'):
        this.habitatService.setGlobalResponseChange('Agricultural', 'Ecological Restoration', $event.checked);
        this.isGlobalAgriculturalRestorationChecked = $event.checked;
        break;
      case('globalUrbanRestoration'):
        this.habitatService.setGlobalResponseChange('Urban', 'Ecological Restoration', $event.checked);
        this.isGlobalUrbanRestorationChecked = $event.checked;
        break;
      case('globalAgriculturalIPM'):
        this.habitatService.setGlobalResponseChange('Agricultural', 'Pesticide Management', $event.checked);
        this.isGlobalAgriculturalIPMChecked = $event.checked;
        break;
      case('globalUrbanIPM'):
        this.habitatService.setGlobalResponseChange('Urban', 'Pesticide Management', $event.checked);
        this.isGlobalUrbanIPMChecked = $event.checked;
        break;
      case('globalAgriculturalFarmingSys'):
        this.habitatService.setGlobalResponseChange('Agricultural', 'Farming System Regulations', $event.checked);
        this.isGlobalAgriculturalFarmingSysChecked = $event.checked;
        break;
      default:
        console.log('Warning: change triggered but no target found.')
    }
  }

  submitGlobalResponses(globalResponsesForm: FormGroup){
    console.log('triggered submitGlobalResponses from GlobalResponsesComponent');
    console.log(JSON.stringify(globalResponsesForm.value, null, 2))
  }
}
