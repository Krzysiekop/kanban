import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { ModalsService } from './modals.service';
import { NgIf } from '@angular/common';
import { CreateNewBoardModalComponent } from './create-new-board-modal/create-new-board-modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { BoardService } from './board.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, BoardComponent, CreateTaskModalComponent, CreateNewBoardModalComponent, TaskModalComponent ,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kaban-task-manager';

  darkBackground!: boolean;
  showCreateTaskModal!: boolean;
  showCreateBoardModal!: boolean;
  showTaskModa!: boolean;

  constructor(private modalService: ModalsService, private boardService: BoardService) {
    this.modalService.isNewTaskModalShown.subscribe(showCreateTaskModal => this.showCreateTaskModal = showCreateTaskModal)
    this.modalService.isDarkBackground.subscribe(darkBackground => this.darkBackground = darkBackground)
    this.modalService.isCreateBoardModalShown.subscribe(showCreateBoardModal => this.showCreateBoardModal = showCreateBoardModal)
    this.modalService.isTaskModalShown.subscribe(showTaskModa => this.showTaskModa = showTaskModa)
  }

  ngOnInit(){
    this.downloadData();
  }

  closeModals() {
    this.modalService.closeCreateTaskModal();
    this.modalService.closeCreateBoardModal();
    this.modalService.closeTaskModal();
  }

  downloadData(){
    this.boardService.getDataFromLocalStorage();
  }
}
