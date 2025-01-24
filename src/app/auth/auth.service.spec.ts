import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
    localStorage.clear(); // Clear localStorage after each test
=======

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
>>>>>>> ce66958e6edbd29bd845bb17be9a35067f12a61b
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
<<<<<<< HEAD

  describe('register', () => {
    it('should send a POST request to register the user', () => {
      const mockUserData = { username: 'testuser', password: '12345' };
      const mockResponse = { message: 'User registered successfully' };

      service.register(mockUserData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUserData);

      req.flush(mockResponse);
    });
  });

  describe('login', () => {
    it('should send a POST request to log in the user', () => {
      const mockUserData = { username: 'testuser', password: '12345' };
      const mockResponse = { token: 'mock-jwt-token' };

      service.login(mockUserData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['baseUrl']}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUserData);

      req.flush(mockResponse);
    });
  });

  describe('getToken', () => {
    it('should return the token from localStorage', () => {
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);

      const token = service.getToken();
      expect(token).toBe(mockToken);
    });

    it('should return null if no token is stored', () => {
      const token = service.getToken();
      expect(token).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if a token exists', () => {
      localStorage.setItem('token', 'mock-jwt-token');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if no token exists', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('getUserRole', () => {
    it('should return the role from a valid token', () => {
      const mockToken = btoa(JSON.stringify({ role: 'admin' }));
      localStorage.setItem('token', `header.${mockToken}.signature`);

      const role = service.getUserRole();
      expect(role).toBe('admin');
    });

    it('should return null if the token is invalid', () => {
      localStorage.setItem('token', 'invalid-token');
      expect(service.getUserRole()).toBeNull();
    });

    it('should return null if no token exists', () => {
      expect(service.getUserRole()).toBeNull();
    });
  });

  describe('getRoles', () => {
    it('should return roles from a valid token', () => {
      const mockRoles = ['admin', 'user'];
      const mockToken = btoa(JSON.stringify({ roles: mockRoles }));
      localStorage.setItem('token', `header.${mockToken}.signature`);

      const roles = service.getRoles();
      expect(roles).toEqual(mockRoles);
    });

    it('should return an empty array if the token is invalid', () => {
      localStorage.setItem('token', 'invalid-token');
      expect(service.getRoles()).toEqual([]);
    });

    it('should return an empty array if no token exists', () => {
      expect(service.getRoles()).toEqual([]);
    });
  });

  describe('logout', () => {
    it('should remove the token from localStorage', () => {
      localStorage.setItem('token', 'mock-jwt-token');
      service.logout();

      expect(localStorage.getItem('token')).toBeNull();
    });
  });
=======
>>>>>>> ce66958e6edbd29bd845bb17be9a35067f12a61b
});
