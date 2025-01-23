import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'getUserRole']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    const form = component.loginForm;
    expect(form).toBeDefined();
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['password'].value).toBe('');
  });

  it('should validate the form correctly', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should not call login API if the form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.login();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('should call login API and navigate on valid form submission for breeder role', fakeAsync(() => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    authServiceSpy.login.and.returnValue(of({ token: 'dummy-token' }));
    authServiceSpy.getUserRole.and.returnValue('breeder');

    component.login();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(authServiceSpy.getUserRole).toHaveBeenCalled();
  }));

  it('should call login API and navigate on valid form submission for organizer role', fakeAsync(() => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    authServiceSpy.login.and.returnValue(of({ token: 'dummy-token' }));
    authServiceSpy.getUserRole.and.returnValue('organizer');

    component.login();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(authServiceSpy.getUserRole).toHaveBeenCalled();
  }));

  it('should handle login errors correctly', () => {
    const errorResponse = { error: { message: 'Invalid credentials' } };
    authServiceSpy.login.and.returnValue(throwError(() => errorResponse));

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');

    component.login();

    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.isSubmitting).toBeFalse();
  });

  it('should display success message and navigate to default route for other roles', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');

    authServiceSpy.login.and.returnValue(of({ token: 'dummy-token' }));
    authServiceSpy.getUserRole.and.returnValue('other');

    component.login();

    expect(component.successMessage).toBe('Login successful! Redirecting...');
  });
});
