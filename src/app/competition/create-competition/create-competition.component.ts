import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-create-competition',
  standalone: false,
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent {
  seasons: any[] = [];
  competitionForm: FormGroup;
  errorMessage: String | null = null;
  successMessage: String | null = null;
  isSubmitting = false;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService,
    private router: Router
  ) {
    this.competitionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', Validators.required],
      distance: ['', [Validators.required, Validators.pattern(/^(\d+(\.\d+)?)\s?(km|m)$/)]],
      date: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^(-?\d{1,2}\.\d+)$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^(-?\d{1,3}\.\d+)$/)]],
      type: ['', Validators.required],
      saisonName: ['', Validators.required]
    });
  }

  createCompetition() {
    if (this.competitionForm.invalid) return;
  
    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;
  
    if (!this.competitionService.isLoggedIn()) {
      setTimeout(() => this.router.navigate(['/auth/login']), 200);
      return;
    }
  
    const competitionData = {
      competition: {
        name: this.competitionForm.value.name,
        distance: this.competitionForm.value.distance,
        date: this.competitionForm.value.date,
        longitude: this.competitionForm.value.longitude,
        latitude: this.competitionForm.value.latitude,
        type: this.competitionForm.value.type,
      },
      saisonName: this.competitionForm.value.saisonName,
    };
  
    console.log('Payload being sent:', competitionData);
  
    this.competitionService.addCompetition(competitionData).subscribe({
      next: (response) => {
        this.successMessage = 'Competition added successfully!';
        setTimeout(() => this.router.navigate(['/competition/competitionsList']), 200);
      },
      error: (error) => {
        console.error('Error adding competition:', error);
        this.errorMessage = error.error.message || 'Failed to add competition';
        this.isSubmitting = false;
      }
    });
  }
  

  ngOnInit(): void {
    this.fetchSeasons();
  }

  fetchSeasons(): void {
    this.competitionService.getSeasons().subscribe({
      next: (data) => {
        this.seasons = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching seasons:', err);
        this.errorMessage = 'Failed to load seasons. Please try again.';
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.competitionForm.controls;
  }
}
