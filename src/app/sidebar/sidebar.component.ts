import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { BoardService } from '../board.service';
import { ModalsService } from '../modals.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  currentBoardIndex: number = 0;
  isSidebarShown: boolean = true;
  boards?: Array<any>;
  currentLocalStorageData: any;

  constructor(public boardService: BoardService, public modalService: ModalsService) {
  }

  ngOnInit() {
    this.boardService.currentBoardIndex.subscribe(currentBoardIndex => this.currentBoardIndex = currentBoardIndex);
    this.boardService.currentColumns.subscribe(columns => this.boards = columns.boards);
    this.boardService.currentColumns.subscribe(currentColumns => this.currentLocalStorageData = currentColumns);
  }

  changeBoard(index: number) {
    this.boardService.changeBoard(index);
    this.setBoardTitle();
  }

  setBoardTitle() {
    let data = this.currentLocalStorageData;
    let title = data.boards[this.currentBoardIndex].name
    this.boardService.boardTitle(title)
  }

  showCreateBoardModal() {
    this.modalService.showCreateBoardModal();
  }

  hideSidebar() {
    this.isSidebarShown = false;
  }

  showSidebar() {
    this.isSidebarShown = true;
  }

}
