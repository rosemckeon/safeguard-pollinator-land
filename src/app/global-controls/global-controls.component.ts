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
