import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {
  data: any; // Define the type according to your data structure
  isLoading = true;
  hasError = false;

  constructor(private apiService: GenericApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apiService.get('Product_Table/') // Adjust endpoint as needed
      .subscribe(
        (response) => {
          this.data = response;
          this.isLoading = false;
        },
        
        (error) => {
          console.error('Error fetching data', error);
          this.hasError = true;
          this.isLoading = false;
        }
      );
  }
}