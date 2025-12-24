import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  public currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.loadUser();
    this.currentUser$.next(this.currentUser);
  }

  private loadUser() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
    }
  }

  login(username: string): User {
    const clean = username.trim();
    // Use a stable id derived from the username so returning users keep ownership
    const stableId = clean.toLowerCase();
    this.currentUser = {
      id: stableId,
      username: clean
    };
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.currentUser$.next(this.currentUser);
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.currentUser$.next(this.currentUser);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}