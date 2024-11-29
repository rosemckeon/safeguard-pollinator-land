import { Routes } from '@angular/router';
import { LandscapeComponent } from './landscape/landscape.component';
//import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
        path: 'B',
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
