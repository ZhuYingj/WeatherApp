import { Routes } from '@angular/router';
import { IntroductionPageComponent } from './pages/introduction-page/introduction-page.component';

export const routes: Routes = [
    { path: '', component: IntroductionPageComponent },
    { path: '**', redirectTo: '' },
];
