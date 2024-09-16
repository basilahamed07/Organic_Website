import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service';// Adjust the path as necessary

@Component({
  selector: 'app-copond',
  templateUrl: './copond.component.html',
  styleUrls: ['./copond.component.css']
})
export class CopondComponent implements OnInit {
  data: any[] = []; // Array to hold the product data
  paginatedData: any[] = []; // Array to hold the current page data
  searchTerm: string = ''; // Search term for filtering
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 6; // Items per page
  totalPages: number = 1; // Total number of pages
  access: string | null = sessionStorage.getItem("access");

  constructor(private apiService: GenericApiService, private route: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.get('coupon/')
      .subscribe(
        (response: any) => {
          this.data = response; // Store the fetched data
          this.totalPages = Math.ceil(this.data.length / this.itemsPerPage); // Calculate total pages
          this.updatePaginatedData(); // Update paginated data for the current page
          console.log('Data fetched successfully', this.data);
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  searchCoupons() {
    // Filter data based on search term
    const filteredData = this.data.filter(item => item.code.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.data = filteredData;
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedData();
  }

  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updatePaginatedData();
    }
  }
}
