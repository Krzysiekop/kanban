import { Component } from '@angular/core';
import { ModalsService } from '../modals.service';
import { NgIf } from '@angular/common';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isDeleteButtonShown: Boolean = false;
  currentBoardIndex: number = 0;
  currentLocalStorageData: any;
  title: string = ""

  constructor(private modalService: ModalsService, private boardService: BoardService) {
    this.boardService.currentBoardIndex.subscribe(currentBoardIndex => this.currentBoardIndex = currentBoardIndex);
    this.boardService.currentColumns.subscribe(currentColumns => this.currentLocalStorageData = currentColumns);
    this.boardService.currentTitle.subscribe(currentTitle => this.title = currentTitle);
    
  }

  ngOnInit(){
    let data = this.currentLocalStorageData;
    this.title = data.boards[this.currentBoardIndex]?.name ?? " ";
  }

  createNewTaskModal() {
    console.log('show task modal')
    this.modalService.showCreateTaskModal();
  }

  deleteBoard() {
    let data = this.currentLocalStorageData;

    data.boards.splice([this.currentBoardIndex], 1)
    this.boardService.saveData(data);
    this.boardService.changeBoard(0);

    this.boardService.boardTitle(data.boards[0]?.name ?? " ")
    this.isDeleteButtonShown = false;
  }

  showDeleteButton() {
    if (this.isDeleteButtonShown === false) {
      this.isDeleteButtonShown = true;
    } else {
      this.isDeleteButtonShown = false;
    }
  }
}
