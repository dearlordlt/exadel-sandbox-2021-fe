import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateDialogComponent } from './update-candidate-dialog.component';

describe('UpdateCandidateDialogComponent', () => {
  let component: UpdateCandidateDialogComponent;
  let fixture: ComponentFixture<UpdateCandidateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCandidateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCandidateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
