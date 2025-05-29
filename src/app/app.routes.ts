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
            scenario: 'urban_restored'
        }
    },
    {
        path: 'urban_restored',
        component: LandscapeComponent,
        data: {
            scenario: 'urban_restored'
        }
    },
    {
        path: 'urban_restored/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'urban_restored'
        }
    },
    {
        path: 'seminat_degraded',
        component: LandscapeComponent,
        data: {
            scenario: 'seminat_degraded'
        }
    },
    {
        path: 'seminat_degraded/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'seminat_degraded'
        }
    },
    {
        path: 'seminat_restored',
        component: LandscapeComponent,
        data: {
            scenario: 'seminat_restored'
        }
    },
    {
        path: 'seminat_restored/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'seminat_restored'
        }
    },
    {
        path: 'agri_degraded',
        component: LandscapeComponent,
        data: {
            scenario: 'agri_degraded'
        }
    },
    {
        path: 'agri_degraded/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'agri_degraded'
        }
    },
    {
        path: 'agri_restored',
        component: LandscapeComponent,
        data: {
            scenario: 'agri_restored'
        }
    },
    {
        path: 'agri_restored/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'agri_restored'
        }
    },
    {
        path: 'mixed_degraded',
        component: LandscapeComponent,
        data: {
            scenario: 'mixed_degraded'
        }
    },
    {
        path: 'mixed_degraded/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'mixed_degraded'
        }
    },
    {
        path: 'mixed_restored',
        component: LandscapeComponent,
        data: {
            scenario: 'mixed_restored'
        }
    },
    {
        path: 'mixed_restored/:requestCode',
        component: LandscapeComponent,
        data: {
            scenario: 'mixed_restored'
        }
    },
    {
        path: 'A',
        redirectTo: '/agri_degraded',
        pathMatch: 'full' as PathMatch
    },
    {
        path: 'B',
        redirectTo: '/agri_restored',
        pathMatch: 'full' as PathMatch
    },
    {
        path: '',
        redirectTo: '/agri_degraded',
        pathMatch: 'full' as PathMatch
    },
    {
        path: '**',
        redirectTo: '/agri_degraded',
        pathMatch: 'full' as PathMatch
    }

];
