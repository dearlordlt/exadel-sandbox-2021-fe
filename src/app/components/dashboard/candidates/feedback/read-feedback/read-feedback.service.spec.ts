import { TestBed } from '@angular/core/testing';

import { ReadFeedbackService } from './read-feedback.service';

describe('ReadFeedbackService', () => {
  let service: ReadFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
