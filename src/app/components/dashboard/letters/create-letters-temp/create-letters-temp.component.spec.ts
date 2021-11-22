import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLettersTempComponent } from './create-letters-temp.component';

describe('CreateLettersTempComponent', () => {
  let component: CreateLettersTempComponent;
  let fixture: ComponentFixture<CreateLettersTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLettersTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLettersTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
