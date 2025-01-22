import { Component } from '@angular/core';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-download-results',
  standalone: true,
  
  templateUrl: './download-results.component.html',
  styleUrl: './download-results.component.css'
})
export class DownloadResultsComponent {
  loading = false;
  errorMessage: string | null = null;

  constructor(private resultService: ResultService) {}

  exportResults(): void {
    this.loading = true;
    this.resultService.exportResults().subscribe({
      next: (data) => {
        this.downloadFile(data, 'application/pdf', 'results.pdf');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error exporting results:', error);
        this.errorMessage = 'Failed to export results. Please try again.';
        this.loading = false;
      },
    });
  }

  private downloadFile(data: Blob, fileType: string, fileName: string): void {
    const blob = new Blob([data], { type: fileType });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
}
