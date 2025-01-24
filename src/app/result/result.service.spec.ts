import { TestBed } from '@angular/core/testing';

import { ResultService } from './result.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResultService', () => {
  let service: ResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ResultService);
  });

});
