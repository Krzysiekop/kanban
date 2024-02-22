import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  public isDarkBackground = new BehaviorSubject<boolean>(false);
  public isNewTaskModalShown = new BehaviorSubject<boolean>(false);
  public isCreateBoardModalShown = new BehaviorSubject<boolean>(false);
  public isTaskModalShown = new BehaviorSubject<boolean>(false);
  
  public columnIndex = new BehaviorSubject<number>(0);
  public taskIndex = new BehaviorSubject<number>(0);

  constructor() { }

  showCreateTaskModal() {
    this.isDarkBackground.next(true);
    this.isNewTaskModalShown.next(true);
  }

  showCreateBoardModal() {
    this.isDarkBackground.next(true);
    this.isCreateBoardModalShown.next(true);
  }

  closeCreateTaskModal() {
    this.isDarkBackground.next(false);
    this.isNewTaskModalShown.next(false);
  }

  closeCreateBoardModal() {
    this.isDarkBackground.next(false);
    this.isCreateBoardModalShown.next(false);
  }

  showTaskModal(){
    this.isDarkBackground.next(true);
    this.isTaskModalShown.next(true);
  }

  closeTaskModal() {
    this.isDarkBackground.next(false);
    this.isTaskModalShown.next(false);
  }
}
