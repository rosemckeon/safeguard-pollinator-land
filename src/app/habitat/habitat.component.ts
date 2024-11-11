import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Habitat } from '../habitat';
//import { HabitatService } from '../habitat.service';
import { HabitatResponseComponent } from '../habitat-response/habitat-response.component';
import { HabitatResponseService } from '../habitat-response.service';
import { ProgressBarMode, MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-habitat',
  standalone: true,
  imports: [CommonModule, HabitatResponseComponent, MatProgressBarModule, MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './habitat.component.html',
  styleUrl: './habitat.component.scss'
})
export class HabitatComponent implements OnInit {
  //habitatService: HabitatService = inject(HabitatService);
  habitatResponseService: HabitatResponseService = inject(HabitatResponseService);
  @Input() habitat!: Habitat;

  mode: ProgressBarMode = 'determinate';
  value: number = 0;

  //value = this.habitat.state?.floralResources!;
    
  bufferValue = 75;

  readonly dialog = inject(MatDialog);

  openHabitatState(identifier: string) {
    const dialogRef = this.dialog.open(habitat1StateContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  calculateValue(wildPollinators: number, floralResources: number, habitatResources: number): void {
    console.log('Triggered calculateValue from HabitatComponent', wildPollinators, floralResources, habitatResources);
    //if(habitat.hasOwnProperty('state')){
      this.value = (wildPollinators + floralResources + habitatResources)/3;
      console.log('Value: ', this.value);
    //}
  }

  constructor(){}
  
  ngOnInit(): void {
    console.log(this.habitat);
    this.calculateValue(this.habitat.state!.wildPollinators!, this.habitat.state!.floralResources!, this.habitat.state!.habitatResources!);
  }
}

@Component({
  selector: 'habitat-state-content',
  templateUrl: './habitat-state.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class habitat1StateContent {
  @Input() habitat!: Habitat;
  // can't seem to get habitat.whatever working inside mat-dialog-content
}