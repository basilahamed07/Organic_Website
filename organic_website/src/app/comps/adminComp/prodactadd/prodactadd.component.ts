import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary
import { MessageService } from 'primeng/api'; // Import MessageService

@Component({
  selector: 'app-prodactadd',
  templateUrl: './prodactadd.component.html',
  styleUrls: ['./prodactadd.component.css'],
  providers: [MessageService] // Provide MessageService here
})
export class ProdactaddComponent implements OnInit {
  userForm: any;
  file: File | null = null;
  access: string | null = sessionStorage.getItem("access");

  constructor(
    private apiService: GenericApiService,
    private route: Router,
    private messageService: MessageService // Inject MessageService
  ) {}

  ngOnInit() {
    this.access = sessionStorage.getItem("access");

    this.userForm = new FormGroup({
      P_Name: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      P_description: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{10,100}$")]),
      P_Price: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{2,4}$")]),
      P_Stock: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{2,4}$")]),
      P_Brand: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z ]{3,20}$")]),
      P_Category_id: new FormControl("", [Validators.required, Validators.pattern("^[1-4]{1}$")]),
      P_image: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fix the errors in the form.' });
      return;
    }

    if (!this.file) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select an image file.' });
      return;
    }

    const headers = {
      'Authorization': `Bearer ${this.access}`
    };

    const formData = new FormData();
    formData.append('P_Name', this.userForm.value.P_Name);
    formData.append('P_description', this.userForm.value.P_description);
    formData.append('P_Price', this.userForm.value.P_Price);
    formData.append('P_Stock', this.userForm.value.P_Stock);
    formData.append('P_Brand', this.userForm.value.P_Brand);
    formData.append('P_Category_id', this.userForm.value.P_Category_id);
    if (this.file) {
      formData.append('P_image', this.file, this.file.name);
    }

    this.apiService.post('Product_Table/', formData, { headers }).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully!' });
        this.userForm.reset();
        this.file = null; // Clear the file input after successful submission
      },
      error => {
        console.error('Error adding product', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding product. Please try again.' });
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
}
