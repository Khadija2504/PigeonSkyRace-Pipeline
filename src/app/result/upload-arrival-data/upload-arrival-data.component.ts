import { Component } from '@angular/core';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-upload-arrival-data',
  standalone: false,
  templateUrl: './upload-arrival-data.component.html',
  styleUrls: ['./upload-arrival-data.component.css']
})
export class UploadArrivalDataComponent {
  selectedFile: File | null = null;
  competitionId: number = 1;
  message: string = '';
  error: string = '';

  constructor(private resultService: ResultService) {}

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.resultService.uploadRaceData(this.competitionId, this.selectedFile).subscribe({
        next: (response) => {
          this.message = 'File uploaded successfully!';
          this.error = '';
          console.log('Upload Response:', response);
        },
        error: (err) => {
          this.error = `Error uploading file: ${err.error}`;
          this.message = '';
          console.error('Upload Error:', err);
        },
      });
    } else {
      this.error = 'Please select a file first.';
      this.message = '';
    }
  }
}
