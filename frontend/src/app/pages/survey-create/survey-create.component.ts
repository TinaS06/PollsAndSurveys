import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { User, Question } from '../../models';

@Component({
  selector: 'app-survey-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {
  currentUser: User | null = null;
  isEditMode = false;
  surveyId: number | null = null;

  title = '';
  description = '';
  questions: Question[] = [];

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.surveyId = +params['id'];
        this.loadSurvey(this.surveyId);
      }
    });
  }

  trackQuestion(_: number, q: Question) {
    return q.id;
  }

  trackOption(index: number, opt: any) {
    return index;
  }

  loadSurvey(id: number) {
    const survey = this.surveyService.getSurveyById(id);
    if (survey) {
      this.title = survey.title;
      this.description = survey.description;
      this.questions = JSON.parse(JSON.stringify(survey.questions));
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  addQuestion() {
    this.questions.push({
      id: Date.now(),
      text: '',
      type: 'text'
    });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  onQuestionTypeChange(index: number): void {
  const q = this.questions[index];
  if (!q) return;

  if (q.type === 'multiple-choice') {
    if (!q.options || q.options.length < 2) {
      q.options = ['Option 1', 'Option 2'];
    }
  } else {
    q.options = undefined;
  }
}

addOption(questionIndex: number): void {
  const q = this.questions[questionIndex];
  if (!q) return;

  if (!q.options) q.options = [];
  q.options.push(`Option ${q.options.length + 1}`);
}

removeOption(questionIndex: number, optionIndex: number): void {
  const q = this.questions[questionIndex];
  if (!q?.options) return;

  q.options.splice(optionIndex, 1);

  if (q.options.length < 2) {
    q.options.push(`Option ${q.options.length + 1}`);
  }
}

  saveSurvey() {
    if (!this.title.trim() || !this.description.trim() || this.questions.length === 0) {
      alert('Please fill in all required fields and add at least one question.');
      return;
    }

    //pls work - validating quest
    for (const question of this.questions) {
      if (!question.text.trim()) {
        alert('All questions must have text.');
        return;
      }
      if (question.type === 'multiple-choice') {
        if (!question.options || question.options.length < 2) {
          alert('Multiple choice questions must have at least 2 options.');
          return;
        }
        if (question.options.some(opt => !opt.trim())) {
          alert('All options must have text.');
          return;
        }
      }
    }

    if (this.isEditMode && this.surveyId) {
      this.surveyService.updateSurvey(this.surveyId, {
        title: this.title,
        description: this.description,
        questions: this.questions
      });
    } else {
      this.surveyService.createSurvey({
        title: this.title,
        description: this.description,
        creatorId: this.currentUser ? this.currentUser.id : 'anonymous',
        creatorName: this.currentUser ? this.currentUser.username : 'Anonymous',
        questions: this.questions
      });
    }

    // If the user is logged in, go to dashboard; otherwise go home
    if (this.currentUser) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  cancel() {
    if (this.currentUser) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}