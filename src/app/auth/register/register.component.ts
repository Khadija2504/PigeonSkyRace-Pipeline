import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      latitude: ['', [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]],
      longitude: ['', [Validators.required, Validators.pattern('^-?\\d+(\\.\\d+)?$')]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const userData = this.registerForm.value;
    this.authService.register(userData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/auth/login']), 200);
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}
