import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { User, Survey } from '../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  publicSurveys: Survey[] = [];
  private sub: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadPublicSurveys();

    this.sub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadPublicSurveys();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  loadPublicSurveys() {
    this.publicSurveys = this.surveyService.getPublicSurveys(this.currentUser?.id || null);
  }

  goToDashboard() {
    if (!this.currentUser) {
      this.login();
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  takeSurvey(surveyId: number) {
    this.router.navigate(['/survey-fill', surveyId]);
  }

  login() {
    const username = prompt('Enter your username:');
    if (username && username.trim()) {
      this.authService.login(username);
      this.currentUser = this.authService.getCurrentUser();
      this.loadPublicSurveys();
    }
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.loadPublicSurveys();
  }
}