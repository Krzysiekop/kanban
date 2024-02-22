import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalsService } from '../modals.service';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.css'
})
export class CreateTaskModalComponent {
  crntBoardIndex!: number;
  selectOptions!: string;
  currentLocalStorageData!: any;

  constructor(private modalService: ModalsService, private boardService: BoardService, private fb: FormBuilder) {
  }

  newTaskForm = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    description: ['' ],
    // subtask: this.fb.control([]),
    status: [this.selectOptions, Validators.required],
  })

  ngOnInit() {
    this.boardService.currentBoardIndex.subscribe(crntBoardIndex => this.crntBoardIndex = crntBoardIndex);
    this.boardService.currentColumns.subscribe(currentColumns => this.currentLocalStorageData = currentColumns);
    this.downloadOptionsForSelect();
  }

  downloadOptionsForSelect() {
    let data = this.currentLocalStorageData;
    let options = data.boards[this.crntBoardIndex].columns;
    this.selectOptions = options.map((item: any) => item.name);
  }

  createNewTask() {
    let data = this.currentLocalStorageData;
    let task = { title: this.title?.value, description: this.description?.value, status: this.status?.value };

    if (data.boards[this.crntBoardIndex].columns[this.newTaskForm.get('status')?.value!].tasks) {
      data.boards[this.crntBoardIndex].columns[this.newTaskForm.get('status')?.value!].tasks.push(task);
    } else {
      data.boards[this.crntBoardIndex].columns[this.newTaskForm.get('status')?.value!]['tasks'] = [task];
    }

    this.boardService.saveData(data);
    this.modalService.closeCreateTaskModal();
  }

  get title() {
    return this.newTaskForm.get('title');
  }

  get description() {
    return this.newTaskForm.get('description');
  }

  // get subtask() {
  //   return this.newTaskForm.get('title');
  // }

  get status() {
    return this.newTaskForm.get('status');
  }
}
