import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeFreeSpotsDialogComponent } from './make-free-spots-dialog.component';

describe('MakeFreeSpotsDialogComponent', () => {
  let component: MakeFreeSpotsDialogComponent;
  let fixture: ComponentFixture<MakeFreeSpotsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeFreeSpotsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeFreeSpotsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
