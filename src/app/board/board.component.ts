import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BoardService } from '../board.service';
import { ModalsService } from '../modals.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor, NgIf, TaskModalComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  currentBoardIndex: number = 0;
  currentLocalStorageData?: any;

  taskIndex: number = 0;
  columnIndex: number = 0;

  constructor(public boardService: BoardService, private modalService: ModalsService) {
  }

  ngOnInit() {
    this.boardService.currentBoardIndex.subscribe(currentBoardIndex => this.currentBoardIndex = currentBoardIndex);
    this.boardService.currentColumns.subscribe(columns => this.currentLocalStorageData = columns);
  }

  showTask(taskIndex: number, columnIndex: number) {
    this.modalService.columnIndex.next(columnIndex);
    this.modalService.taskIndex.next(taskIndex)
    this.modalService.showTaskModal();
  }

  numberOfCompletedSubtasks(subtasks: Array<any>): number {
    return subtasks.filter(subtask => subtask.isCompleted === true).length
  }

  onDragStart(taskIndex: any, columnIndex: any) {
    this.taskIndex = taskIndex;
    this.columnIndex = columnIndex;
  }

  onDrop(newColumnIndex: any) {
    let data = this.currentLocalStorageData;
    let x = data.boards[this.currentBoardIndex].columns[this.columnIndex].tasks[this.taskIndex]
    data.boards[this.currentBoardIndex].columns[this.columnIndex].tasks.splice(this.taskIndex, 1)
    data.boards[this.currentBoardIndex].columns[newColumnIndex].tasks.push(x)

    this.boardService.saveData(data)
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }
}
