import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { TaskListComponent } from '../task-list/task-list';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFormComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  tasks: Task[] = [];
  showTaskForm = false;
  currentTask: Task | null = null;
  taskService = inject(TaskService);

  constructor() { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error: (error: any) => {
        console.error('Error al cargar tareas', error);
      }
    });
  }

  openNewTaskForm(): void {
    this.currentTask = null;
    this.showTaskForm = true;
  }

  editTask(task: Task): void {
    this.currentTask = { ...task };
    this.showTaskForm = true;
  }

  closeTaskForm(): void {
    this.showTaskForm = false;
    this.currentTask = null;
  }

  saveTask(task: Task): void {
    if (task.id) {
      this.taskService.updateTask(task).subscribe({
        next: (updatedTask: Task) => {
          this.tasks = this.tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
          this.closeTaskForm();
        },
        error: (error: any) => console.error('Error al actualizar tarea', error)
      });
    } else {
      this.taskService.createTask(task).subscribe({
        next: (newTask: any) => {
          this.tasks.push(newTask);
          this.closeTaskForm();
        },
        error: (error: any) => console.error('Error al crear tarea', error)
      });
    }
  }

  deleteTask(taskId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        error: (error: any) => console.error('Error al eliminar tarea', error)
      });
    }
  }

  toggleTaskCompletion(task: Task): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe({
      next: (result: Task) => {
        this.tasks = this.tasks.map(t => t.id === result.id ? result : t);
      },
      error: (error: any) => console.error('Error al actualizar estado de tarea', error)
    });
  }
}
