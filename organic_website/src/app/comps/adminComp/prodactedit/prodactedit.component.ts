import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary
import { MessageService } from 'primeng/api'; // Import MessageService

@Component({
  selector: 'app-prodactedit',
  templateUrl: './prodactedit.component.html',
  styleUrls: ['./prodactedit.component.css'],
  providers: [MessageService] // Add MessageService to providers
})
export class ProdacteditComponent implements OnInit {
  prodact: any = {
    P_Name: '',
    P_description: '',
    P_Price: '',
    P_Stock: '',
    P_Brand: '',
    P_Category_id: '',
    P_image: null
  };

  userForm: FormGroup;
  file: File | null = null;
  prodactid: any;

  constructor(
    private apiService: GenericApiService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService // Inject MessageService
  ) {
    // Initialize form group
    this.userForm = new FormGroup({
      P_Name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}$')]),
      P_description: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]{10,100}$')]),
      P_Price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,5}$')]),
      P_Stock: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]),
      P_Brand: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,100}$')]),
      P_Category_id: new FormControl('', [Validators.required, Validators.pattern('^[1-4]{1}$')]),
      P_image: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.prodactid = this.route.snapshot.paramMap.get("id");

    this.apiService.get(`Product_Table/${this.prodactid}/`)
      .subscribe(
        (res: any) => {
          this.prodact = res;
          this.userForm.patchValue(this.prodact); // Set form values with product data
        },
        error => {
          console.error('Error fetching product data', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching product data. Please try again.' });
        }
      );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  addData(): void {
    if (this.userForm.invalid) {
      console.log(this.userForm.invalid);
      return;
    }

    const formData = new FormData();
    for (const key of Object.keys(this.userForm.value)) {
      formData.append(key, this.userForm.get(key)?.value);
    }
    if (this.file) {
      formData.append('P_image', this.file, this.file.name);
    }

    this.apiService.put(`Product_Table/${this.prodactid}/`, formData)
      .subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully.' });
          setTimeout(() => this.router.navigate(['/admindash']), 1500); // Delay navigation to allow toast to display
        },
        error => {
          console.error('Error updating product', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating product. Please try again.' });
        }
      );
  }
}
