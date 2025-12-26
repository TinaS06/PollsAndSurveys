import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { User, Survey } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  mySurveys: Survey[] = [];
  

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  getResponseCount(surveyId: number): number {
  return this.surveyService.getResponseCount(surveyId);
}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadMySurveys();
  }

  loadMySurveys() {
    if (this.currentUser) {
      this.mySurveys = this.surveyService.getMySurveys(this.currentUser.id);
    } else {
      this.mySurveys = this.surveyService.getMySurveys('anonymous');
    }
  }

  createNewSurvey() {
    this.router.navigate(['/survey-create']);
  }

  editSurvey(surveyId: number) {
    this.router.navigate(['/survey-create', surveyId]);
  }

  deleteSurvey(surveyId: number) {
    if (confirm('Delete this survey?')) {
      this.surveyService.deleteSurvey(surveyId);
      this.loadMySurveys();
    }
  }

  viewResults(surveyId: number) {
    this.router.navigate(['/survey-results', surveyId]);
  }

  takeSurvey(surveyId: number) {
    this.router.navigate(['/survey-fill', surveyId]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}