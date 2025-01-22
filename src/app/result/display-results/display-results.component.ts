import { Component, OnInit } from '@angular/core';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-display-results',
  standalone: false,
  
  templateUrl: './display-results.component.html',
  styleUrl: './display-results.component.css'
})
export class DisplayResultsComponent implements OnInit{

  results: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.fetchResults();
  }

  fetchResults(): void {
    this.loading = true;
    this.resultService.getResults().subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching results:', error);
        this.errorMessage = 'An error occurred while fetching results.';
        this.loading = false;
      }
    });
  }
}

