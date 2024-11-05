import { Routes } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';

export const routes: Routes = [] = [
    {
        path: 'A',
        component: LandscapeComponent,
        data: {
            scenario: 'A'
        }
    },
    {
        path: 'B',
        component: LandscapeComponent,
        data: {
            scenario: 'B'
        } 
    },
    {
        path: '**',
        component: LandscapeComponent,
        data: {
            scenario: 'A'
        }
    }

];
