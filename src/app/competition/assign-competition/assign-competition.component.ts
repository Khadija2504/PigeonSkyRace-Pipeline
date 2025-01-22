import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-assign-competition',
  standalone: false,
  
  templateUrl: './assign-competition.component.html',
  styleUrl: './assign-competition.component.css'
})
export class AssignCompetitionComponent {
  assignPigeonForm: FormGroup;
  competitions: any[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isSubmitting = false;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private competitionService: CompetitionService
  ) {
    this.assignPigeonForm = this.fb.group({
      badge: ['', [Validators.required, Validators.minLength(3)]],
      competitionId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCompetitions();    
  }

  fetchCompetitions(): void {
    this.competitionService.getAllCompetitions().subscribe({
      next: (data) => {
        this.competitions = data;
        this.isLoading = false;
        console.log(this.competitions);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized. Please log in again.';
        } else {
          this.errorMessage = 'Failed to load competitions. Please try again later.';
        } 
        console.error('Error fetching competitions:', error);
        this.isLoading = false;
      }
    });
  }
  

  assignPigeon(): void {
    if (this.assignPigeonForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const { badge, competitionId } = this.assignPigeonForm.value;

    this.competitionService.addPigeonToCompetition(competitionId, badge).subscribe({
      next: () => {
        this.successMessage = 'Pigeon successfully assigned to competition!';
        this.assignPigeonForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Failed to assign pigeon to competition.';
        this.isSubmitting = false;
      }
    });
  }

}
