import { Routes } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';
type PathMatch = "full" | "prefix" | undefined;
 
// interesting solution to disabling back and refresh if game has started
// https://stackoverflow.com/questions/42808818/is-it-possible-to-stop-router-navigation-based-on-some-condition

export const routes: Routes = [] = [
    {
        path: 'urban_degraded',
        component: LandscapeComponent,
        data: {
            scenario: 'urban_degraded'
        }
    },
    {
        path: 'urban_degraded/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'urban_degraded'
        }
    },
    {
        path: 'A',
        component: LandscapeComponent,
        data: {
            scenario: 'A'
        }
    },
    {
        path: 'A/:requestCode',
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
        path: 'B/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'B'
        } 
    },
    {
        path: '',
        redirectTo: '/urban_degraded',
        pathMatch: 'full' as PathMatch
    },
    {
        path: '**',
        redirectTo: '/urban_degraded',
        pathMatch: 'full' as PathMatch
    }

];
