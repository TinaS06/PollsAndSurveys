import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { Survey, User } from '../../models';

@Component({
  selector: 'app-survey-fill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './survey-fill.component.html',
  styleUrls: ['./survey-fill.component.css']
})
export class SurveyFillComponent implements OnInit {
  survey!: Survey;
  currentUser: User | null = null;

  answers: Record<number, any> = {};
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService,
    private authService: AuthService
    , private location: Location
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.surveyService.getSurveyById(id);

    if (!found) {
      alert('Survey not found.');
      this.router.navigate(['/home']);
      return;
    }

    this.survey = found;
  }

  submit(): void {
    const response = {
      surveyId: this.survey.id,
      userId: this.currentUser?.id ?? null, // anonymous allowed
      submittedAt: new Date().toISOString(),
      answers: this.answers
    };

    this.surveyService.saveResponse(this.survey.id, response);
    alert('Thanks! Your response has been submitted.');
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }
}