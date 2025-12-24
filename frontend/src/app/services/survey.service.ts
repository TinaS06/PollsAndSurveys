import { Injectable } from '@angular/core';
import { Survey } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private surveys: Survey[] = [];

  constructor() {
    this.loadSurveys();
  }

  private loadSurveys(): void {
    const stored = localStorage.getItem('surveys');
    if (stored) {
      this.surveys = JSON.parse(stored);
    } else {

      const now = Date.now();
      this.surveys = [
        {
          id: now,
          title: 'Customer Satisfaction Survey',
          description: 'Help us improve by answering a few quick questions.',
          creatorId: 'system',
          creatorName: 'System',
          createdAt: new Date().toISOString(),
          questions: [
            { id: 1, text: 'How satisfied are you with our product?', type: 'rating' },
            { id: 2, text: 'What did you like most?', type: 'text' },
            { id: 3, text: 'Which features do you use?', type: 'multiple-choice', options: ['Feature A', 'Feature B', 'Feature C'] }
          ]
        },
        {
          id: now + 1,
          title: 'Event Feedback',
          description: 'Tell us about your experience at our recent event.',
          creatorId: 'system',
          creatorName: 'System',
          createdAt: new Date().toISOString(),
          questions: [
            { id: 11, text: 'Rate the event overall', type: 'rating' },
            { id: 12, text: 'Any suggestions for improvement?', type: 'text' }
          ]
        }
      ];
      this.saveSurveys();
    }
  }

  private saveSurveys(): void {
    localStorage.setItem('surveys', JSON.stringify(this.surveys));
  }


  getAllSurveys(): Survey[] {
    return this.surveys;
  }

  getSurveyById(id: number): Survey | undefined {
    return this.surveys.find(s => s.id === id);
  }

  getMySurveys(userId: string): Survey[] {
    return this.surveys.filter(s => s.creatorId === userId);
  }

  getPublicSurveys(userId: string | null): Survey[] {
    if (!userId) return this.surveys;
    return this.surveys.filter(s => s.creatorId !== userId);
  }

  createSurvey(survey: Omit<Survey, 'id' | 'createdAt'>): Survey {
    const newSurvey: Survey = {
      ...survey,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };

    this.surveys.push(newSurvey);
    this.saveSurveys();
    return newSurvey;
  }

  updateSurvey(id: number, updates: Partial<Survey>): boolean {
    const index = this.surveys.findIndex(s => s.id === id);
    if (index === -1) return false;

    this.surveys[index] = { ...this.surveys[index], ...updates };
    this.saveSurveys();
    return true;
  }

  deleteSurvey(id: number): boolean {
    const before = this.surveys.length;
    this.surveys = this.surveys.filter(s => s.id !== id);

    if (this.surveys.length === before) return false;

    localStorage.removeItem(this.responsesKey(id));

    this.saveSurveys();
    return true;
  }

  private responsesKey(surveyId: number): string {
    return `responses_${surveyId}`;
  }

  saveResponse(surveyId: number, response: any): void {
    const key = this.responsesKey(surveyId);
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(response);
    localStorage.setItem(key, JSON.stringify(existing));
  }

  getResponses(surveyId: number): any[] {
    const key = this.responsesKey(surveyId);
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  submitResponse(surveyId: number, answers: { [questionId: number]: any }, userId?: string | null): boolean {
    const survey = this.getSurveyById(surveyId);
    if (!survey) return false;

    const response = {
      id: Date.now(),
      surveyId,
      userId: userId ?? null,
      submittedAt: new Date().toISOString(),
      answers
    };

    this.saveResponse(surveyId, response);
    return true;
  }

  getResponseCount(surveyId: number): number {
    return this.getResponses(surveyId).length;
  }
}