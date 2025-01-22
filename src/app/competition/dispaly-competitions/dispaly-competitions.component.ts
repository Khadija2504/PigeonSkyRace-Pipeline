import { Component } from '@angular/core';
import { CompetitionService } from '../competition.service';

@Component({
  selector: 'app-dispaly-competitions',
  standalone: false,
  
  templateUrl: './dispaly-competitions.component.html',
  styleUrl: './dispaly-competitions.component.css'
})
export class DispalyCompetitionsComponent {
  competitions: any[] = [];
  isLoading= true;
  errorMessage: string | null = null;

  constructor(private competitionService: CompetitionService) {
  }

  ngOnInit(): void {
    this.fetchCompetitions();    
  }
  
  fetchCompetitions(): void {
    this.competitionService.getAllCompetitions().subscribe({
      next: (data) => {
        console.log(data);
        
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
}
