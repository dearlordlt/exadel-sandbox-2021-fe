import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalProgramComponent } from './educational-program.component';

describe('EducationalProgramComponent', () => {
  let component: EducationalProgramComponent;
  let fixture: ComponentFixture<EducationalProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
