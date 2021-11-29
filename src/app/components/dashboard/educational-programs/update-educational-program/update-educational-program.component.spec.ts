import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEducationalProgramComponent } from './update-educational-program.component';

describe('UpdateEducationalProgramComponent', () => {
  let component: UpdateEducationalProgramComponent;
  let fixture: ComponentFixture<UpdateEducationalProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEducationalProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEducationalProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
