import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitatService } from '../habitat.service';
import { RoundService } from '../round.service';
import { LandscapeComponent } from '../landscape/landscape.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowTurnRightDown, heroArrowLongLeft, heroArrowUpOnSquare } from '@ng-icons/heroicons/outline';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-controls',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent, LandscapeComponent],
  providers: [provideIcons({ heroArrowTurnRightDown, heroArrowLongLeft, heroArrowUpOnSquare, heroCheckCircleSolid })],
  templateUrl: './global-controls.component.html',
  styleUrl: './global-controls.component.scss'
})
export class GlobalControlsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  habitatService = inject(HabitatService);
  roundService = inject(RoundService);

  globalChangesForm = new FormGroup({
    globalSeminatural: new FormControl(''),
    globalAgricultural: new FormControl(''),
    globalUrban: new FormControl(''),
  });

  //seminaturalClasses = 'bg-lime-700 text-lime-700 border-lime-700 hover:bg-lime-300';
  //agriculturalClasses = 'bg-amber-500 text-amber-950 border-amber-500 hover:bg-amber-300';
  //urbanClasses = 'text-stone-200 bg-stone-500 border-stone-500 hover:bg-stone-300';
  seminaturalClasses = 'semi-natural';
  agriculturalClasses = 'agricultural';
  urbanClasses = 'urban';

  selectedSeminaturalClasses = this.seminaturalClasses;
  selectedAgriculturalClasses = this.agriculturalClasses;
  selectedUrbanClasses = this.urbanClasses;

  updateGlobalControlClasses(id:string, classes:string): void {
    console.log('triggered updateGlobalControlClasses');
    if(id == 'globalSeminatural'){
      this.selectedSeminaturalClasses = classes;
    } else if(id == 'globalAgricultural'){
      this.selectedAgriculturalClasses = classes;
    } else if(id == 'globalUrban'){
      this.selectedUrbanClasses = classes;
    }
  }

  onSelectedGlobalControl(value:string, id:string): void {
    console.log('triggered onSelectedGlobalControl', id, value);
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
	}

  constructor() {
    this.globalChangesForm.controls.globalSeminatural.disabled == true;
  }

  submitGlobalChanges() {
    this.habitatService.submitGlobalChanges(
      this.globalChangesForm.value.globalSeminatural ?? '',
      this.globalChangesForm.value.globalAgricultural ?? '',
      this.globalChangesForm.value.globalUrban ?? '',
    );
  }  
}
