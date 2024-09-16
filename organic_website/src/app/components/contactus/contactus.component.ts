import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent  {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData=this.contactForm.value;
   
      const access = sessionStorage.getItem("access");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access}`
    });this.http.post('http://localhost:8000/api/feedback/', formData).subscribe(
      response => {
        // Handle success (show success message, clear form, etc.)
        window.alert('Message sent successfully!');
        this.contactForm.reset();
      },
      error => {
        // Handle error (show error message)
        window.alert('Error occured');
        console.error('Error sending message:', error);
      }
    );

    }
  }
}
