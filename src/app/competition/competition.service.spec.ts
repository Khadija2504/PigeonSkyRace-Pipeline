import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompetitionService } from './competition.service';

describe('CompetitionService', () => {
  let service: CompetitionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompetitionService],
    });
    service = TestBed.inject(CompetitionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorage.setItem('token', JSON.stringify({ token: 'mock-jwt-token' }));
      expect(service.getToken()).toEqual('{"token":"mock-jwt-token"}');
    });

    it('should return null if no token is present', () => {
      localStorage.removeItem('token');
      expect(service.getToken()).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('token', JSON.stringify({ token: 'mock-jwt-token' }));
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if no token exists', () => {
      localStorage.removeItem('token');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('addCompetition', () => {
    it('should send a POST request to add a competition', () => {
      const competitionDetails = { name: 'Competition 1' };
      const mockResponse = { message: 'Competition successfully added' };

      service.addCompetition(competitionDetails).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8900/api/organizer/addCompetition');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(competitionDetails);
      req.flush(mockResponse);
    });
  });

  describe('getSeasons', () => {
    it('should send a GET request to fetch all seasons', () => {
      const mockSeasons = [{ id: 1, name: 'Season 1' }];

      service.getSeasons().subscribe(seasons => {
        expect(seasons).toEqual(mockSeasons);
      });

      const req = httpMock.expectOne('http://localhost:8900/api/organizer/getAllSeasons');
      expect(req.request.method).toBe('GET');
      req.flush(mockSeasons);
    });
  });

  describe('addPigeonToCompetition', () => {
    it('should send a PUT request to add a pigeon to a competition', () => {
      const competitionId = 1;
      const badge = 'Pigeon123';
      const mockResponse = { message: 'Pigeon successfully added to the competition' };

      service.addPigeonToCompetition(competitionId, badge).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`http://localhost:8900/api/organizer/${competitionId}/addPigeonToCompetition?badge=${badge}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
    });
  });

  describe('getAllCompetitions', () => {
    it('should send a GET request to fetch all competitions', () => {
      const mockCompetitions = [{ id: 1, name: 'Competition 1' }];

      service.getAllCompetitions().subscribe(competitions => {
        expect(competitions).toEqual(mockCompetitions);
      });

      const req = httpMock.expectOne('http://localhost:8900/api/organizer/getAllCompetitions');
      expect(req.request.method).toBe('GET');
      req.flush(mockCompetitions);
    });
  });
});
