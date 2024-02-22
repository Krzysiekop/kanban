import { Component } from '@angular/core';
import { ModalsService } from '../modals.service';
import { BoardService } from '../board.service';
import { Task } from '../create-new-board-modal/create-new-board-modal.component';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {

  columnIndex: number = 0;
  taskIndex: number = 0;
  currentBoardIndex: number = 0;
  isDeleteButtonShown: boolean = false;
  currentLocalStorage: any = [];

  task!: Task;
  selectOptions: string = " ";

  editTaskForm = this.fb.group({
    status: [this.selectOptions, Validators.required],
  })

  constructor(private modalService: ModalsService, private boardService: BoardService, private fb: FormBuilder) { }

  ngOnInit() {
    this.modalService.columnIndex.subscribe(columnIndex => this.columnIndex = columnIndex);
    this.modalService.taskIndex.subscribe(taskIndex => this.taskIndex = taskIndex);
    this.boardService.currentBoardIndex.subscribe(currentBoardIndex => this.currentBoardIndex = currentBoardIndex);
    this.boardService.currentColumns.subscribe(currentColumns => this.currentLocalStorage = currentColumns);

    let data = this.currentLocalStorage;
    this.task = data.boards[this.currentBoardIndex].columns[this.columnIndex].tasks[this.taskIndex];

    let options = data.boards[this.currentBoardIndex].columns;
    this.selectOptions = options.map((item: any) => item.name);
  }

  get status() {
    return this.editTaskForm.get('status');
  }

  onStatusChange(e: Event) {
    let data = this.currentLocalStorage;

    let x = data.boards[this.currentBoardIndex].columns[this.columnIndex].tasks[this.taskIndex];
    data.boards[this.currentBoardIndex].columns[this.columnIndex].tasks.splice(this.taskIndex, 1);

    if (this.status?.value) {
      data.boards[this.currentBoardIndex].columns[this.status.value].tasks.push(x);
    }
    else {
      data.boards[this.currentBoardIndex].columns[0].tasks.push(x);
    }

    this.boardService.saveData(data);
    this.modalService.closeTaskModal();
  }

  showDeleteButton() {
    if (this.isDeleteButtonShown === false) {
      this.isDeleteButtonShown = true;
    } else {
      this.isDeleteButtonShown = false;
    }
  }

  deleteTask() {
    let data = this.currentLocalStorage;

    data.boards[this.currentBoardIndex].columns[this.columnIndex].tasks.splice(this.taskIndex, 1);

    this.boardService.saveData(data);
    this.modalService.closeTaskModal();
  }

}
