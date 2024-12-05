import { Routes } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';
type PathMatch = "full" | "prefix" | undefined;
 
// interesting solution to disabling back and refresh if game has started
// https://stackoverflow.com/questions/42808818/is-it-possible-to-stop-router-navigation-based-on-some-condition

export const routes: Routes = [] = [
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
        redirectTo: '/A',
        pathMatch: 'full' as PathMatch
    },
    {
        path: '**',
        redirectTo: '/A',
        pathMatch: 'full' as PathMatch
    }

];
