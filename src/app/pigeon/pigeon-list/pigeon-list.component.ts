import { Component, OnInit } from '@angular/core';
import { PigeonService } from '../pigeon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pigeon-list',
  standalone: false,
  templateUrl: './pigeon-list.component.html',
  styleUrls: ['./pigeon-list.component.css']
})
export class PigeonListComponent implements OnInit {
  pigeons: any[] = [];
  errorMessage: string | null = null;

  constructor(private pigeonService: PigeonService, private router: Router) {}

  ngOnInit(): void {
    this.getPigeonsList();
  }

  getPigeonsList(): void {
    this.errorMessage = null;
    
    this.pigeonService.getPigeons().subscribe({
      next: (response) => {
        this.pigeons = response;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'failed to load pigeons. please try again.';
      }
    });
  }

}
