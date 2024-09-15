import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.css'] // Corrected property name
})
export class FeedbackformComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      message: ['', [Validators.required]],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      remarks: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.http.post('http://localhost:8000/api/feedback/', this.feedbackForm.value)
        .pipe(
          catchError(error => {
            console.error('Error occurred:', error);
            alert('Failed to submit feedback. Please try again later.');
            return of(null); // Return a fallback observable
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('Feedback submitted successfully!', response);
            alert('Feedback submitted successfully!');
            this.feedbackForm.reset();
          }
        });
    } else {
      console.log('Form is invalid');
      alert('Please correct the errors in the form.');
    }
  }
}
