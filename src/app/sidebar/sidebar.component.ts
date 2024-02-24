import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BoardService } from '../board.service';
import { ModalsService } from '../modals.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  currentBoardIndex: number = 0;
  isSidebarShown: boolean = true;
  boards?: Array<any>;
  currentLocalStorageData: any;
  isLightThemeActive: boolean = false;

  constructor(public boardService: BoardService, public modalService: ModalsService) {
  }

  ngOnInit() {
    this.boardService.currentBoardIndex.subscribe(currentBoardIndex => this.currentBoardIndex = currentBoardIndex);
    this.boardService.currentColumns.subscribe(columns => this.boards = columns.boards);
    this.boardService.currentColumns.subscribe(currentColumns => this.currentLocalStorageData = currentColumns);
    this.themeOnStart()
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

  changeTheme() {
    if (this.isLightThemeActive === false) {
      this.isLightThemeActive = !this.isLightThemeActive
      localStorage.setItem('theme', 'light-theme')
      document.body.classList.toggle("light-theme");
    } else {
      this.isLightThemeActive = !this.isLightThemeActive
      localStorage.setItem('theme', 'dark-theme')
      document.body.classList.toggle("light-theme");
    }
  }

  themeOnStart() {
    let theme = localStorage.getItem('theme');
    if (theme === 'light-theme') {
      document.body.classList.add("light-theme");
      this.isLightThemeActive = true;
    } else {
      // default -dark theme
    }
  }

}
