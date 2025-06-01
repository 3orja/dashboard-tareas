import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskCompleted = new EventEmitter<Task>();
  @Output() taskEdited = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();

  onTaskCompleted(task: Task): void {
    this.taskCompleted.emit(task);
  }

  onTaskEdit(task: Task): void {
    this.taskEdited.emit(task);
  }

  onTaskDelete(id: number): void {
    this.taskDeleted.emit(id);
  }
}