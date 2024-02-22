import { Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalsService } from '../modals.service';
import { BoardService } from '../board.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-new-board-modal',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './create-new-board-modal.component.html',
  styleUrl: './create-new-board-modal.component.css'
})

export class CreateNewBoardModalComponent {

  currentBoardIndex: number = 0;
  boards?: Array<any>;
  board!: Board
  currentLocalStorageData!: any;

  constructor(private modalService: ModalsService, private boardService: BoardService, private fb: FormBuilder) {
  }

  newBoardForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    columns: this.fb.array([]),
  })

  ngOnInit() {
    this.boardService.currentColumns.subscribe(columns => this.currentLocalStorageData = columns);
    this.createFirstColumnInForm()
  }

  createNewBoard() {
    let data = this.currentLocalStorageData;
    let columData = this.newBoardForm.get('columns')?.value;

    columData?.forEach(element => {
      if (element instanceof Object)
        element = Object.assign(element, { tasks: [] })
    });

    this.board = { name: this.newBoardForm.get('name')?.value!, columns: columData as Column };
    data.boards.push(this.board);

    this.boardService.saveData(data);
    this.modalService.closeCreateBoardModal();
  }

  get name() {
    return this.newBoardForm.get('name');
  }
  get columns() {
    return this.newBoardForm.controls['columns'] as FormArray;
  }

  addColumn(event: Event) {
    event.preventDefault();
    const columnForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.columns.push(columnForm);
  }

  createFirstColumnInForm() {
    const columnForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.columns.push(columnForm);
  }
}

export interface Board {
  name?: string,
  columns?: Column,
};

export interface Column {
  name?: string,
  tasks?: Array<Task>
}

export interface Task {
  title?: string,
  description?: string
  status?: string
}
