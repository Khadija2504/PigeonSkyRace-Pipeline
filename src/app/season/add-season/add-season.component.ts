import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeasonService } from '../season.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-season',
  standalone: false,
  
  templateUrl: './add-season.component.html',
  styleUrl: './add-season.component.css'
})
export class AddSeasonComponent {
  seasonForm: FormGroup;
  errorMessage: String | null = null;
  successMessage: String | null = null;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private seasonService: SeasonService, private router: Router) {
    this.seasonForm = this.fb.group({
      name: ['', [Validators.required, Validators.nullValidator]],
      date: ['', [Validators.required, this.futureOrPresentValidator]]
    });
  }

  futureOrPresentValidator(control: any): { [key: string]: boolean } | null {
    if (control.value) {
      const inputDate = new Date(control.value);
      const currentDate = new Date();
      if (inputDate < currentDate) {
        return { futureOrPresent: true };
      }
    }
    return null;
  }

  addSeason() {
    if(this.seasonForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
    if(!this.seasonService.isLoggedIn) {
      setTimeout(() => this.router.navigate(['/auth/login']), 200);
    }

    const seasonData = this.seasonForm.value;
    this.seasonService.addSeason(seasonData).subscribe({
      next: (Response) => {
        this.successMessage = 'season added successfully';
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'add season fild';
        this.isSubmitting = false;
      }
    });
  }

  get f() {
    return this.seasonForm.controls;
  }


}
