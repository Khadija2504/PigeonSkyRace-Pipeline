import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterComponent } from './register.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.registerForm;
    expect(form).toBeDefined();
    expect(form.controls['username'].value).toBe('');
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['password'].value).toBe('');
    expect(form.controls['confirmPassword'].value).toBe('');
    expect(form.controls['latitude'].value).toBe('');
    expect(form.controls['longitude'].value).toBe('');
  });

  it('should return mismatch error if passwords do not match', () => {
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password456');
    expect(component.registerForm.errors).toEqual({ mismatch: true });
  });

  it('should validate the form correctly', () => {
    component.registerForm.controls['username'].setValue('testuser');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    component.registerForm.controls['name'].setValue('Test Name');
    component.registerForm.controls['latitude'].setValue('34.0522');
    component.registerForm.controls['longitude'].setValue('-118.2437');

    expect(component.registerForm.valid).toBeTrue();
  });

  it('should not call register API if form is invalid', () => {
    component.registerForm.controls['username'].setValue('');
    component.register();

    expect(authServiceSpy.register).not.toHaveBeenCalled();
  });

  it('should call register API on valid form submission', fakeAsync(() => {
    component.registerForm.controls['username'].setValue('testuser');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    component.registerForm.controls['name'].setValue('Test Name');
    component.registerForm.controls['latitude'].setValue('34.0522');
    component.registerForm.controls['longitude'].setValue('-118.2437');

    authServiceSpy.register.and.returnValue(of({ message: 'Registration successful' }));

    component.register();
    tick();

    expect(authServiceSpy.register).toHaveBeenCalledWith(component.registerForm.value);
  }));

  it('should handle registration errors correctly', () => {
    const errorResponse = { error: { message: 'Registration failed' } };
    authServiceSpy.register.and.returnValue(throwError(() => errorResponse));

    component.registerForm.controls['username'].setValue('testuser');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    component.registerForm.controls['name'].setValue('Test Name');
    component.registerForm.controls['latitude'].setValue('34.0522');
    component.registerForm.controls['longitude'].setValue('-118.2437');

    component.register();

    expect(component.errorMessage).toBe('Registration failed');
    expect(component.isSubmitting).toBeFalse();
  });

  it('should display success message and redirect on successful registration', fakeAsync(() => {
    authServiceSpy.register.and.returnValue(of({ message: 'Registration successful' }));

    component.registerForm.controls['username'].setValue('testuser');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['confirmPassword'].setValue('password123');
    component.registerForm.controls['name'].setValue('Test Name');
    component.registerForm.controls['latitude'].setValue('34.0522');
    component.registerForm.controls['longitude'].setValue('-118.2437');

    component.register();
    tick();

    expect(component.successMessage).toBe('Registration successful! Redirecting to login...');
  }));
});
