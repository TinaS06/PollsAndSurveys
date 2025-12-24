export interface User {
  id: string;
  username: string;
}

export type QuestionType = 'text' | 'multiple-choice' | 'rating';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface Survey {
  id: number;
  title: string;
  description: string;
  creatorId: string;
  createdAt?: string;
  questions: Question[];
}