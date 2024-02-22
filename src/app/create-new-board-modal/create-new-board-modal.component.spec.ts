import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBoardModalComponent } from './create-new-board-modal.component';

describe('CreateNewBoardModalComponent', () => {
  let component: CreateNewBoardModalComponent;
  let fixture: ComponentFixture<CreateNewBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewBoardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
