import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
=======

>>>>>>> ce66958e6edbd29bd845bb17be9a35067f12a61b
import { PigeonService } from './pigeon.service';

describe('PigeonService', () => {
  let service: PigeonService;
<<<<<<< HEAD
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PigeonService],
    });
    service = TestBed.inject(PigeonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
=======

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigeonService);
>>>>>>> ce66958e6edbd29bd845bb17be9a35067f12a61b
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
<<<<<<< HEAD

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

  describe('addPigeon', () => {
    it('should send a POST request to add a pigeon', () => {
      const pigeonData = { name: 'Pigeon 1', breed: 'Breed A' };
      const mockResponse = { message: 'Pigeon successfully added.' };

      service.addPigeon(pigeonData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('http://localhost:8900/api/breeder/addPigeon');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(pigeonData);
      req.flush(mockResponse);
    });
  });

  describe('getPigeons', () => {
    it('should send a GET request to fetch all pigeons', () => {
      const mockPigeons = [{ id: 1, name: 'Pigeon 1', breed: 'Breed A' }];

      service.getPigeons().subscribe(pigeons => {
        expect(pigeons).toEqual(mockPigeons);
      });

      const req = httpMock.expectOne('http://localhost:8900/api/breeder/getAllPigeons');
      expect(req.request.method).toBe('GET');
      req.flush(mockPigeons);
    });
  });
});
=======
});
>>>>>>> ce66958e6edbd29bd845bb17be9a35067f12a61b
