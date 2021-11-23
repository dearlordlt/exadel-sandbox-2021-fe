import { TestBed } from '@angular/core/testing';

import { EducationalProgramsService } from './educational-programs.service';

describe('EducationalProgramsService', () => {
  let service: EducationalProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
