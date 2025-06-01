import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskDashboardComponent],
  template: `
    <div class="app-container">
      <header>
        <nav class="navbar">
          <div class="navbar-brand">Dashboard de Tareas</div>
        </nav>
      </header>
      
      <main>
        <!-- Añade esta línea para usar TaskDashboardComponent directamente -->
        <app-task-dashboard></app-task-dashboard>
        <!-- O usa router-outlet si prefieres enrutamiento -->
        <router-outlet></router-outlet>
      </main>
      
      <footer>
        <p>&copy; 2025 Dashboard de Tareas</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    header {
      background-color: #343a40;
      padding: 1rem 0;
    }
    
    .navbar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .navbar-brand {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
    
    main {
      flex: 1;
      padding: 2rem 0;
      background-color: #f8f9fa;
    }
    
    footer {
      background-color: #343a40;
      color: #fff;
      padding: 1rem 0;
      text-align: center;
    }
  `]
})
export class App {
  title = 'Dashboard de Tareas';
}
