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
    globalSeminaturalChange: new FormControl(''),
    globalAgriculturalChange: new FormControl(''),
    globalUrbanChange: new FormControl(''),
  });

  seminaturalClasses = 'bg-lime-700 text-lime-300 border-lime-700 hover:bg-lime-300';
  agriculturalClasses = 'bg-amber-500 text-amber-950 border-amber-500 hover:bg-amber-300';
  urbanClasses = 'text-stone-200 bg-stone-500 border-stone-500 hover:bg-stone-300';

  selectedSeminaturalClasses = this.seminaturalClasses;
  selectedAgriculturalClasses = this.agriculturalClasses;
  selectedUrbanClasses = this.urbanClasses;

  onSelected(value:string, id:string): void {
    console.log(id, value);
		if(value == 'semi-nat'){
      if(id == 'globalSeminatural'){
        this.selectedSeminaturalClasses = this.seminaturalClasses;
      } else if(id == 'globalAgricultural'){
        this.selectedAgriculturalClasses = this.seminaturalClasses;
      } else if(id == 'globalUrban'){
        this.selectedUrbanClasses = this.seminaturalClasses;
      }
    } else if(value == 'agri'){
      if(id == 'globalSeminatural'){
        this.selectedSeminaturalClasses = this.agriculturalClasses;
      } else if(id == 'globalAgricultural'){
        this.selectedAgriculturalClasses = this.agriculturalClasses;
      } else if(id == 'globalUrban'){
        this.selectedUrbanClasses = this.agriculturalClasses;
      }
    } else if(value == 'urban'){
      if(id == 'globalSeminatural'){
        this.selectedSeminaturalClasses = this.urbanClasses;
      } else if(id == 'globalAgricultural'){
        this.selectedAgriculturalClasses = this.urbanClasses;
      } else if(id == 'globalUrban'){
        this.selectedUrbanClasses = this.urbanClasses;
      }
    } else {
      console.log('onSelected: no change registered.')
    }
	}

  
  constructor() {
  }
  submitGlobalChanges() {
    this.globalChangesService.submitGlobalChanges(
      this.globalChangesForm.value.globalSeminaturalChange ?? '',
      this.globalChangesForm.value.globalAgriculturalChange ?? '',
      this.globalChangesForm.value.globalUrbanChange ?? '',
    );
  }  
}
