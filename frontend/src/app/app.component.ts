import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <header class="app-header">
      <div style="display:flex;align-items:center;gap:12px">
        <a routerLink="/home" class="brand" style="text-decoration:none;color:var(--primary);font-weight:700">{{ title }}</a>
      </div>
      <nav class="nav">
        <a routerLink="/home" class="btn btn-ghost" style="padding:6px 10px">Home</a>
        <a routerLink="/dashboard" class="btn btn-ghost" style="padding:6px 10px">Dashboard</a>
        <ng-container *ngIf="currentUser; else loggedOut">
          <div class="small" style="margin-left:10px">{{ currentUser.username }}</div>
          <button class="btn btn-primary" style="margin-left:8px" (click)="logout()">Logout</button>
        </ng-container>
        <ng-template #loggedOut>
          <button class="btn btn-primary" style="margin-left:8px" (click)="login()">Login</button>
        </ng-template>
      </nav>
    </header>

    <main style="padding:1rem;">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Polls & Surveys';
  currentUser: User | null = null;
  

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(u => this.currentUser = u);
  }

  login() {
    const username = prompt('Enter username:');
    if (username && username.trim()) {
      this.auth.login(username.trim());
      this.router.navigate(['/dashboard']);
    }
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}