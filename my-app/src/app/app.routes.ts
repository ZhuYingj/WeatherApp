import { Routes } from '@angular/router';
import { IntroductionPageComponent } from './pages/introduction-page/introduction-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: IntroductionPageComponent },
    { path: 'home', component: MainPageComponent}
];
