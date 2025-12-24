import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { FormatDateTimePipe } from '../../pipes/format-datetime.pipe';
import { Survey } from '../../models';

@Component({
  selector: 'app-survey-results',
  standalone: true,
  imports: [CommonModule, FormatDateTimePipe],
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  survey!: Survey;
  responses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.surveyService.getSurveyById(id);

    if (!found) {
      alert('Survey not found.');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.survey = found;
    this.responses = this.surveyService.getResponses(id);
  }
}
