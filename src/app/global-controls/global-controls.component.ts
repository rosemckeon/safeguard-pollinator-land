import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalChangesService } from '../global-changes.service';
import { Habitat } from '../habitat';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroArrowTurnRightDown, heroArrowLongLeft } from '@ng-icons/heroicons/outline';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-global-controls',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconComponent],
  providers: [provideIcons({ heroArrowTurnRightDown, heroArrowLongLeft })],
  templateUrl: './global-controls.component.html',
  styleUrl: './global-controls.component.scss'
})
export class GlobalControlsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  globalChangesService = inject(GlobalChangesService);
  globalChangesForm = new FormGroup({
    globalSeminatural: new FormControl(''),
    globalAgricultural: new FormControl(''),
    globalUrban: new FormControl(''),
  });

  seminaturalClasses = 'bg-lime-700 text-lime-300 border-lime-700 hover:bg-lime-300';
  agriculturalClasses = 'bg-amber-500 text-amber-950 border-amber-500 hover:bg-amber-300';
  urbanClasses = 'text-stone-200 bg-stone-500 border-stone-500 hover:bg-stone-300';

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
		if(value == 'semi-nat'){
      this.updateGlobalControlClasses(id, this.seminaturalClasses);
    } else if(value == 'agri'){
      this.updateGlobalControlClasses(id, this.agriculturalClasses);
    } else if(value == 'urban'){
      this.updateGlobalControlClasses(id, this.urbanClasses);
    }
    let button = <HTMLButtonElement>document.getElementById('buttonSubmitGlobalChanges');
    button.disabled = false;
	}
  constructor() {
  }
  submitGlobalChanges() {
    this.globalChangesService.submitGlobalChanges(
      this.globalChangesForm.value.globalSeminatural ?? '',
      this.globalChangesForm.value.globalAgricultural ?? '',
      this.globalChangesForm.value.globalUrban ?? '',
    );
  }  
}
