import { Injectable } from '@angular/core';
import data from './../assets/data.json'
import { BehaviorSubject } from 'rxjs';
import { Board } from './create-new-board-modal/create-new-board-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  public boardIndex = new BehaviorSubject<number>(0);
  public columns = new BehaviorSubject<any>([]);
  public title = new BehaviorSubject<string>("");

  currentColumns = this.columns.asObservable();
  currentBoardIndex = this.boardIndex.asObservable();
  currentTitle = this.title.asObservable();
  

  changeBoard(index: number) {
    this.boardIndex.next(index);
  }

  getDataFromLocalStorage() {
    if (localStorage.getItem('data') != null) {
      let boardsFromLocalStorage = localStorage.getItem('data') ?? " ";
      let parseData = JSON.parse(boardsFromLocalStorage);
      this.columns.next(parseData)
    }
    else {
      localStorage.setItem("data", JSON.stringify(data));
      let boardsFromLocalStorage = localStorage.getItem('data') ?? " ";
      let parseData = JSON.parse(boardsFromLocalStorage);
      this.columns.next(parseData)
    }
  }

  saveData(data: any) {
    localStorage.setItem("data", JSON.stringify(data))
    this.columns.next(data)
  }

  boardTitle(title: string) {
    this.title.next(title);
  }

}