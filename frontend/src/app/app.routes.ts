import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SurveyCreateComponent } from './pages/survey-create/survey-create.component';
import { SurveyFillComponent } from './pages/survey-fill/survey-fill.component';
import { SurveyResultsComponent } from './pages/survey-results/survey-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'survey-create', component: SurveyCreateComponent },
  { path: 'survey-create/:id', component: SurveyCreateComponent },

  { path: 'survey-fill/:id', component: SurveyFillComponent },
  { path: 'survey-results/:id', component: SurveyResultsComponent },

  { path: '**', redirectTo: '' }
];
