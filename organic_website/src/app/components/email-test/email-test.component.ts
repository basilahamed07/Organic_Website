import { Component } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-email-test',
  templateUrl: './email-test.component.html',
  styleUrl: './email-test.component.css'
})
export class EmailTestComponent {
  toEmail: string = '';
  subject: string = '';
  message: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private emailService: EmailService) {}

  sendEmail() {
    this.emailService.sendEmail(this.toEmail, this.subject, this.message).subscribe(
      response => {
        this.successMessage = 'Email sent successfully!';
        this.errorMessage = null;
        // Clear form fields
        this.toEmail = '';
        this.subject = '';
        this.message = '';
      },
      error => {
        this.errorMessage = 'Failed to send email. Please try again.';
        this.successMessage = null;
      }
    );
  }
}
