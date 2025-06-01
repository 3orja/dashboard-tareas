import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: Task | null = null;
  @Output() formClosed = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<Task>();
  
  taskForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description || '',
        priority: this.taskToEdit.priority || 'medium',
        dueDate: this.taskToEdit.dueDate ? new Date(this.taskToEdit.dueDate).toISOString().slice(0, 10) : '',
        completed: this.taskToEdit.completed
      });
    } else {
      this.resetForm();
    }
  }
  
  createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['medium'],
      dueDate: [''],
      completed: [false]
    });
  }
  
  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      completed: false
    });
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        ...formValue,
        id: this.taskToEdit ? this.taskToEdit.id : undefined
      };
      this.taskSaved.emit(task);
    }
  }
  
  onCancel(): void {
    this.formClosed.emit();
  }
}