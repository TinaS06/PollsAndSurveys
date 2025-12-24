import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <header class="app-header">
      <div style="display:flex;align-items:center;gap:12px">
        <img src="assets/logo.svg" alt="logo" style="width:36px;height:36px;border-radius:8px;" />
        <div style="font-weight:700;color:var(--primary)">{{ title }}</div>
      </div>
      <nav class="nav">
        <a routerLink="/home" class="btn btn-ghost" style="padding:6px 10px">Home</a>
        <a routerLink="/dashboard" class="btn btn-ghost" style="padding:6px 10px">Dashboard</a>
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
}
